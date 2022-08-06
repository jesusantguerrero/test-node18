import { reducer as siteReducer } from "./sites/sitesSlice"
import runCheckSaga from "./sites/sagas/runChecks.saga"


export const rootReducer = {
    sites: siteReducer
}

export const rootSagas = runCheckSaga;
