'use client'

import { makeStore } from "@/Redux/store"
import { useRef } from "react"
import { Provider } from "react-redux"

export default function ReduxProvider({ children,preloadedState }: {
     children:React.ReactNode,
     preloadedState?:any
}){
     const storeRef = useRef<any>(null)
     if(!storeRef.current){
          storeRef.current = makeStore(preloadedState)
     }

     return <Provider store={storeRef.current}>{children}</Provider>
}