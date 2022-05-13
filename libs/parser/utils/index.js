export const arrowFnImplicitReturnTypesRegex = /Literal|Identifier|(\w)*Expression/;

export const functionDefinitionTypes = [
    'FunctionDeclaration',
    'FunctionExpression',
    'ArrowFunctionExpression',
];
// Inspired by: http://alltom.com/pages/instrumenting-javascript/
export const traceBlock = (code, fnName, start, end) => `{
    const idWithExtensionToAvoidConflicts = nextId();
    Tracer.enterFunc(idWithExtensionToAvoidConflicts, '${fnName}', ${start}, ${end});
    try {
      ${code}
    } catch (e) {
      Tracer.errorFunc(e.message, idWithExtensionToAvoidConflicts, '${fnName}', ${start}, ${end});
      throw e;
    } finally {
      Tracer.exitFunc(idWithExtensionToAvoidConflicts, '${fnName}', ${start}, ${end});
    }
  }`

// TODO: Maybe change this name to avoid conflicts?
export const nextId = (() => {
    let id = 0;
    return () => id++;
  })();