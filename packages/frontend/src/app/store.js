import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counters/counterSlice";
import { siteSlice } from "../features/sites/sitesSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [siteSlice.reducerPath]: siteSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(siteSlice.middleware);
    }
});
