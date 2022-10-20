import { parentPort, workerData } from "worker_threads"; 
import falafel from "falafel";
import { transform } from "@babel/core";
import { VM } from "vm2";
import { arrowFnImplicitReturnTypesRegex, traceBlock, functionDefinitionTypes, nextId } from "./utils/index.js";

const isString = (str) => typeof str === 'string' || str instanceof String;
const arrToPrettyStr = (arr) => arr.map(a => isString(a) ? a : prettyFormat(a)).join(' ') + '\n'
const event = (type, payload) => ({ type, payload });
const Events = {
  ConsoleLog: (message) => event('ConsoleLog', { message }),
  ConsoleWarn: (message) => event('ConsoleWarn', { message }),
  ConsoleError: (message) => event('ConsoleError', { message }),

  EnterFunction: (id, name, start, end) => event('EnterFunction', { id, name, start, end }),
  ExitFunction: (id, name, start, end) => event('ExitFunction', { id, name, start, end }),
  ErrorFunction: (message, id, name, start, end) => event('ErrorFunction', { message, id, name, start, end }),

  InitPromise: (id, parentId) => event('InitPromise', { id, parentId }),
  ResolvePromise: (id) => event('ResolvePromise', { id }),
  BeforePromise: (id) => event('BeforePromise', { id }),
  AfterPromise: (id) => event('AfterPromise', { id }),

  InitMicrotask: (id, parentId) => event('InitMicrotask', { id, parentId }),
  BeforeMicrotask: (id) => event('BeforeMicrotask', { id }),
  AfterMicrotask: (id) => event('AfterMicrotask', { id }),

  InitTimeout: (id, callbackName) => event('InitTimeout', { id, callbackName }),
  BeforeTimeout: (id) => event('BeforeTimeout', { id }),

  UncaughtError: (error) => event('UncaughtError', {
    name: (error || {}).name,
    stack: (error || {}).stack,
    message: (error || {}).message,
  }),
  EarlyTermination: (message) => event('EarlyTermination', { message }),
};

let events = [];
const postEvent = (event) => {
  events.push(event);
  parentPort.postMessage(JSON.stringify(event));
}

const EventBus = {
    enterFunc: (id, name, start, end) => postEvent(Events.EnterFunction(id, name, start, end)),
    exitFunc: (id, name, start, end) => postEvent(Events.ExitFunction(id, name, start, end)),
    errorFunc: (message, id, name, start, end) => postEvent(Events.ErrorFunction(message, id, name, start, end)),
    log: (...args) => postEvent(Events.ConsoleLog(arrToPrettyStr(args))),
    warn: (...args) => postEvent(Events.ConsoleWarn(arrToPrettyStr(args))),
    error: (...args) => postEvent(Events.ConsoleError(arrToPrettyStr(args))),
    iterateLoop: () => {
      const hasTimedOut = (Date.now() - START_TIME) > TIMEOUT_MILLIS;
      const reachedEventLimit = events.length >= EVENT_LIMIT;
      const shouldTerminate = reachedEventLimit || hasTimedOut;
      if (shouldTerminate) {
        postEvent(Events.EarlyTermination(hasTimedOut
          ? `Terminated early: Timeout of ${TIMEOUT_MILLIS} millis exceeded.`
          : `Termianted early: Event limit of ${EVENT_LIMIT} exceeded.`
        ));
        process.exit(1);
      }
    },
};

export function parseCode(code, socket) {
    console.log(code)
    const output = falafel(code, (node) => {
        const parentType = node.parent && node.parent.type;
        const isBlockStatement = node.type === 'BlockStatement';
        const isArrowFnReturnType = arrowFnImplicitReturnTypesRegex.test(node.type);
        const isArrowFunctionBody = parentType === 'ArrowFunctionExpression';
        const isArrowFn = node.type === 'ArrowFunctionExpression';
        const isFunctionBody = functionDefinitionTypes.includes(parentType);

        if (isBlockStatement && isFunctionBody) {
            const { start, end } = node.parent;
            const fnName = (node.parent.id && node.parent.id.name) || 'anonymous';
            const block = node.source();
            const blockWithoutCurlies = block.substring(1, block.length - 1);
            node.update(traceBlock(blockWithoutCurlies, fnName, start, end))
          }
          else if (isArrowFnReturnType && isArrowFunctionBody) {
            const { start, end, params } = node.parent;
        
            const isParamIdentifier = params.some(param => param === node);
        
            if (!isParamIdentifier) {
              const fnName = (node.parent.id && node.parent.id.name) || 'anonymous';
              const block = node.source();
              const returnedBlock = `return (${block});`;
              node.update(traceBlock(returnedBlock, fnName, start, end))
            }
          } else if (isArrowFn) {
            const body = node.source();
            const firstCurly = body.indexOf('{');
            const lastCurly = body.lastIndexOf('}');
            const hasCurlies = firstCurly !== -1 && lastCurly !== -1;
        
            // We already updated all arrow function bodies to have curlies, so here
            // we can assume if a body looks like `({ ... })`, then we need to remove
            // the parenthesis.
            if (hasCurlies) {
              const parensNeedStripped = body[firstCurly - 1] === '(';
              if (parensNeedStripped) {
                const bodyBlock = body.substring(firstCurly, lastCurly + 1);
                const bodyWithoutParens = `() => ${bodyBlock}`;
                node.update(bodyWithoutParens);
              }
            }
        }
    })

    const modifiedSource = transform(output.toString())
  .code;

  const vm = new VM({
      sandbox: {
          nextId,
          setTimeout,
          Tracer: EventBus,
          console: {
            log: EventBus.log,
            error: EventBus.error,
            warn: EventBus.warn
          }
      }
  })

  return vm.run(modifiedSource);
}

parseCode(workerData);