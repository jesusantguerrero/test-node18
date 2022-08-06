import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counters/counterSlice";
import { siteSlice, reducer } from "../features/sites/sitesSlice";
import { rootSagas } from "../features";

import createSagaMiddleware from "redux-saga"

const sagaMiddleWare = createSagaMiddleware()
const middleware = [siteSlice.middleware, sagaMiddleWare]

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        checks: reducer,
        [siteSlice.reducerPath]: siteSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware);
    }
});

sagaMiddleWare.run(rootSagas)
