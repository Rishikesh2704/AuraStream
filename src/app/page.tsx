import { makeStore } from "@/Redux/store"
import Home from "./(pages)/home/Home"
import { Animeapi } from "@/Redux/Fetchslice"
import ReduxProvider from "./ReduxProvider";

export default async function Homepage(){
    const store = makeStore();
    await store.dispatch(Animeapi.endpoints.Home.initiate(''))
    const preloadedState = store.getState();
    console.log(preloadedState)
   return(
      <>
      <ReduxProvider preloadedState={preloadedState}>
        <Home />
      </ReduxProvider>
      </>
   )
}