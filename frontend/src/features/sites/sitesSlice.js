import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import config from "../../config";


export const siteSlice = createApi({
    reducerPath: "sites",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiV1
    }),
    endpoints(builder) {
        return {
            fetchSites: builder.query({
                query: () => `/sites`
            })
        }
    }
})

export const { useFetchSitesQuery } = siteSlice;

