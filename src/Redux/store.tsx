import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Animeapi } from "./Fetchslice";
import { setupListeners } from "@reduxjs/toolkit/query";
import stateSliceReducer from "./StateSlice";

const RootReducer = combineReducers({
  [Animeapi.reducerPath]: Animeapi.reducer,
  states: stateSliceReducer,
});

export function makeStore(preloadedState?: any) {
  const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(Animeapi.middleware),
    preloadedState,
  });

  setupListeners(store.dispatch);

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
