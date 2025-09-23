'use client'

import Modal from '@/app/Components/Modal/Modal'
import { useHomeQuery } from '@/Redux/Fetchslice'
import TopAnimesSection from './(pages)/home/TopAnimesSection'
import TrendAnimes from './(pages)/home/TrendAnimes'
import SpotLightSection from '@/app/(pages)/home/SpotLightSection'
import OtherSection from '@/app/(pages)/home/OtherSection'
import { useAppSelector } from '@/Redux/hooks'
import AuhtUI from '@/app/Authentication/AuthUI'
import Loading from './loading'



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
   // const location = useLocation()
  //  const homeRef = useRef(null);
   const { modalState, infoid, authModalState } = useAppSelector((st) => st.states)

   // let name = location.pathname.split("/")
   // let currgen

   // if (name[1] === "genre") {
   //    name[1] = location.pathname.slice(1)
   //    currgen = name[1].split('/')[1]
   // }



   const { data: ReduxHome, isLoading: Reduxloading, error } = useHomeQuery({
      pollingInterval: 60 * 60000,
      skipPollingIfUnfocused: true
   });

   // ref={homeRef}
   // const isHome = name[1] === "Home" || name[1] === ""

   const isOther = (key: string) =>
      key !== "genres" &&
      key !== "today" &&
      key !== "topTen" &&
      key !== "spotlights" &&
      key !== "trending" &&
      key !== "today"
      

   return (
      <>
         {!Reduxloading  && Object.entries(ReduxHome).map(([key, value]) => {
            if (key === "spotlights") return (<SpotLightSection key={key} spotlightCoverAnimes={value as spotlightAnimeTypes[]} />)
         })}

         {!Reduxloading
            ?
            <div className='Home'  >
               { Object.entries(ReduxHome).map(([key, value]) => {

                  if (key === 'trending') return (<TrendAnimes key={key + 1} animes={value as animeType[]} />)

                  if (key === "topTen") return (<TopAnimesSection key={key + 2} animes={value as propsType} />)

                  if (isOther(key)) return (<OtherSection key={key + 3} keys={key} animeli={value as animeType[]} />)

               })}
            </div>
            :
            <Loading/>
         }

         {modalState && <Modal id={infoid} />}
         {authModalState && <AuhtUI />}
      </>
   )
}
