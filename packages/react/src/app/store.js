import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counters/counterSlice";
import { siteSlice, reducer } from "../features/sites/sitesSlice";

const middleware = [siteSlice.middleware]

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

