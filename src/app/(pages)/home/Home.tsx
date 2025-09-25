'use client'

import Modal from '@/app/Components/Modal/Modal'
import { useHomeQuery } from '@/Redux/Fetchslice'
import SpotLightSection from '@/app/(pages)/home/SpotLightSection'   
import { useAppSelector } from '@/Redux/hooks'
import AuhtUI from '@/app/Authentication/AuthUI'
import dynamic from 'next/dynamic'

const OtherSection = dynamic(() => import('@/app/(pages)/home/OtherSection'))
const TrendAnimes = dynamic(() => import('./TrendAnimes'))
const TopAnimesSection = dynamic(() => import('./TopAnimesSection'),{ssr:false})

type topAnimeType = {
   id: string,
   number: string,
   poster: string,
   title: string,
   tvInfo: {
      dub: string,
      sub: string,
   }
}

type propsType = {
   month: topAnimeType[],
   today: topAnimeType[],
   week: topAnimeType[],
}

export default function Home() {
  
   const { modalState, infoid, authModalState } = useAppSelector((st) => st.states)
   const {data:ReduxHome,isLoading} = useHomeQuery('',{
         refetchOnMountOrArgChange:false,
    });
    console.log(ReduxHome)
   const isOther = (key: string) =>
      key !== "genres" &&
      key !== "today" &&
      key !== "topTen" &&
      key !== "spotlights" &&
      key !== "trending" &&
      key !== "today"

    if(!ReduxHome) return null

   return (
      <>
        { Object.entries(ReduxHome).map(([key, value]) => {
            if (key === "spotlights") return (<SpotLightSection key={key} spotlightCoverAnimes={value as spotlightAnimeTypes[]} />)
         })}

        
            <div className='Home'  >
               { Object.entries(ReduxHome).map(([key, value]) => {

                  if (key === 'trending') return (<TrendAnimes key={key + 1} animes={value as animeType[]} />)

                  if (key === "topTen") return (<TopAnimesSection key={key + 2} animes={value as propsType} />)

                  if (isOther(key)) return (<OtherSection key={key + 3} keys={key} animeli={value as animeType[]} />)

               })}
            </div>

         {modalState && <Modal id={infoid} />}
         {authModalState && <AuhtUI />}
      </>
   )
}



 // const location = useLocation()
  //  const homeRef = useRef(null);
  // const {Data:ReduxHome,preloadeddata} = props
  
  // let name = location.pathname.split("/")
  // let currgen
  
  // if (name[1] === "genre") {
   //    name[1] = location.pathname.slice(1)
   //    currgen = name[1].split('/')[1]
   // }
   
   // console.log(preloadeddata)
   
   
   
   // ref={homeRef}
   // const isHome = name[1] === "Home" || name[1] === ""