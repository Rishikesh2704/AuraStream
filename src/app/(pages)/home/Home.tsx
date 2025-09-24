'use client'

import Modal from '@/app/Components/Modal/Modal'
import { useHomeQuery } from '@/Redux/Fetchslice'
import TopAnimesSection from './TopAnimesSection'
import TrendAnimes from './TrendAnimes'
import SpotLightSection from '@/app/(pages)/home/SpotLightSection'
import OtherSection from '@/app/(pages)/home/OtherSection'
import { useAppSelector } from '@/Redux/hooks'
import AuhtUI from '@/app/Authentication/AuthUI'
import Loading from '../Loading'

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
   const {data:ReduxHome} = useHomeQuery(undefined,{
       refetchOnMountOrArgChange:false,
    });
   
   const isOther = (key: string) =>
      key !== "genres" &&
      key !== "today" &&
      key !== "topTen" &&
      key !== "spotlights" &&
      key !== "trending" &&
      key !== "today"

   return (
      <>
         {ReduxHome  && Object.entries(ReduxHome).map(([key, value]) => {
            if (key === "spotlights") return (<SpotLightSection key={key} spotlightCoverAnimes={value as spotlightAnimeTypes[]} />)
         })}

         {ReduxHome
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