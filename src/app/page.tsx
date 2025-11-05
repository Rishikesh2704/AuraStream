import { makeStore } from "@/Redux/store"
import Home from "./(pages)/home/Home"
import { Animeapi } from "@/Redux/Fetchslice"
import ReduxProvider from "./ReduxProvider";
import Loading from "./loading";

export default async function Homepage(){
    const store = makeStore();
    await store.dispatch(Animeapi.endpoints.Home.initiate(''))
    const preloadedState = store.getState();
   return(
      <ReduxProvider preloadedState={preloadedState}>
        <Home />  
      </ReduxProvider>
   )
}