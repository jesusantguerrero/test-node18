import { call, put, takeLatest } from "redux-saga/effects"
import { siteService } from "../../../services"
import { executeCheck, setSites } from "../sitesSlice"

export function* runCheck() {
    const data  = yield call(siteService.runCheck)
    yield put(setSites(data) )
} 

export default function* runCheckSaga() {
    yield takeLatest(executeCheck, runCheck)
}