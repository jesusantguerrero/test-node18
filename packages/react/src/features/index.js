import { reducer as siteReducer } from "./sites/sitesSlice"


export const rootReducer = {
    sites: siteReducer
}