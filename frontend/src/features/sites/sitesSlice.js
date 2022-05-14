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
            }),
            updateSite: builder.mutation({
                query: (id, ...patch) => ({
                    url: `/sites/${id}`,
                    method: 'PATCH',
                    body: patch
                })
            }),
            deleteSite: builder.mutation({
                query: (id) => ({
                    url: `/sites/${id}`,
                    method: 'DELETE'
                })
            }),
            runCheck: builder.mutation({
                query: () => ({
                    url: `/sites/check`,
                    method: 'POST'
                })
            }),
        }
    }
})

export const { useFetchSitesQuery, useUpdateSiteMutation, useRunCheckMutation, useDeleteSiteMutation } = siteSlice;

