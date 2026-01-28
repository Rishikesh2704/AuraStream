import { useEffect, useState } from "react";


export default function useDebounce(value:string,delay:number){
   const [debouncedValue, setDebouncedValue] = useState(value)

   useEffect(() => {
     const handler = setTimeout(() =>{
        if(value.length <=0) return
         setDebouncedValue(value)
     },delay)

     return () => clearTimeout(handler)
   } ,[value,delay])

    return debouncedValue
}