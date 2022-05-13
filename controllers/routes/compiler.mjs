import express from "express";
import { useSocket } from "../../libs/socket.mjs";
import { launchWorker } from "../../libs/parser/workerLauncher.js";
import { reduceEvents } from "../../libs/parser/eventReducer.js";

const CompilerRouter = express.Router();

CompilerRouter.post('/', async (req, res) => {
    const body = req.body
    const { getInstance } = useSocket()
    const events = []
    let isFinished = false;
    launchWorker(body.code, evtString =>  {
        const socket = getInstance()
        if (!isFinished) {
            const evt = JSON.parse(evtString);
            events.push(evt);
  
            if (evt.type === 'Done') {
              socket.emit('message', reduceEvents(events))
            }
          }
    })
    res.json({
        state: 'running'
    })
})

export { CompilerRouter }