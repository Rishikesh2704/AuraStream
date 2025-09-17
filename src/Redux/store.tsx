import { configureStore } from "@reduxjs/toolkit";
import { Animeapi } from "./Fetchslice";
import { setupListeners } from "@reduxjs/toolkit/query";
import stateSliceReducer from "./StateSlice";
export const store = configureStore({
    reducer:{
       [Animeapi.reducerPath]: Animeapi.reducer,
       states:stateSliceReducer
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(Animeapi.middleware)
    
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch