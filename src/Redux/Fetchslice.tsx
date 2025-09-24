import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

type responseType<t> = { results: t };

type serversParamsType = {
  animeid: string;
  epid: string;
};
type streamParamsType = {
  animeid: string;
  epid: string;
  server: string;
  type: string;
};

function isHydrateAction(action: Action): any {
  return action.type === HYDRATE
}

// const FetchURl = process.env.NODE_ENV === "development"?"http://localhost:4444/api":"https://anime-api-vert-alpha.vercel.app/api"

export const Animeapi = createApi({
  reducerPath: "Animeapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://anime-api-vert-alpha.vercel.app/api",
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    Home: builder.query({
      query: () => "/",
      transformResponse: (response: any) => response.results,
    }),

    Animeinfo: builder.query<InfoTypes, string>({
      query: (animeid) => `/info?id=${animeid}`,
      transformResponse: (res: responseType<InfoTypes>): InfoTypes =>
        res.results,
    }),

    SearchSuggestions: builder.query<Partial<animeType>[], string>({
      query: (keyword) => `/search/suggest?keyword=${keyword}`,
      transformResponse: (res: responseType<Partial<animeType>[]>) =>
        res.results,
    }),

    Eplist: builder.query<episodeList, string | string[]>({
      query: (animeid) => `/episodes/${animeid}`,
      transformResponse: (res: responseType<episodeList>) => res.results,
    }),

    Animeservers: builder.query<serverType[], serversParamsType>({
      query: (animeid) => `/servers/${animeid.animeid}?ep=${animeid.epid}`,
      transformResponse: (res: responseType<serverType[]>) => res.results,
    }),

    Animestream: builder.query<streamType, streamParamsType>({
      query: (animeid) =>
        `/stream?id=${animeid.animeid}?ep=${animeid.epid}&server=${animeid.server}&type=${animeid.type}`,
      transformResponse: (res: responseType<streamType>) => res.results,
      extraOptions: { maxRetries: 3 },
    }),

    Animesearch: builder.infiniteQuery<pagesType, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (last, allpage, lastPageParam: number) =>
          lastPageParam + 1,
      },
      query({ queryArg, pageParam = 1 }) {
        return `/search?keyword=${queryArg}`;
      },
      transformResponse: (res: responseType<pagesType>): pagesType =>
        res.results,
    }),

    GenreAnime: builder.infiniteQuery<pagesType, string, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (last, allpage, lastPageParam) => lastPageParam + 1,
      },
      query({ queryArg, pageParam }) {
        return `/genre/${queryArg}?page=${pageParam}`;
      },
      transformResponse: (res: responseType<pagesType>): pagesType =>
        res.results,
    }),
  }),
});

export const {
  useHomeQuery,
  useAnimeinfoQuery,
  useEplistQuery,
  useAnimeserversQuery,
  useAnimestreamQuery,
  useAnimesearchInfiniteQuery,
  useGenreAnimeInfiniteQuery,
  useSearchSuggestionsQuery,
} = Animeapi;
