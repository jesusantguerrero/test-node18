import { describe, expect, it } from "vitest";
import { runCheck } from "../features/sites/sagas/runChecks.saga.js";

describe('RunChecks Saga', () => {
    it('successfully run the checks', () => {
        const gen = runCheck()
        gen.next()
        gen.next()
        expect(gen.next()).toEqual({
            done: true, value: undefined
        })
    })
})