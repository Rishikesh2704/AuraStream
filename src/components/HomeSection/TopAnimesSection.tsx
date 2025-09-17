import { useState, memo } from 'react'
import { setInfoid, setModalState } from '../../Redux/StateSlice'
import { useAppDispatch } from '../../Redux/hooks'



type topAnimeType = {
   id:string,
   number:string,
   poster:string,
   title:string,
   tvInfo:{
      dub:string,
      sub:string,
   }
}

type propsType = {
   month:topAnimeType[],
   today:topAnimeType[],
   week:topAnimeType[],
}

const TopAnimesSection = memo((props:{animes:propsType}) => {
   const mediaquery = window.matchMedia("(max-width:600px)")
   const dispatch = useAppDispatch();
   const { animes } = props
   const [ani, setani] = useState('today')

   const showinfo = (id:string) => {
      dispatch(setModalState(true))
      let modal = document.getElementsByClassName('Modal-contentbox')
      dispatch(setInfoid(id))
   }


   return (<>
      <div className='Top10'>
         <div className='Top10CName'  >
            <h2 id="Top10Tag">Top 10</h2>
            <ul id="top10">
               {Object.keys(animes).map((li, index) => (
                  <li 
                     className={ani!==li?"top10Category":" "}
                     key={index}
                     id={`li${index}`}
                     style={{
                        textDecoration: ani === li ? "underline" : "none",
                        textUnderlineOffset: ani === li ? (mediaquery.matches?"0.6rem":"0.75rem") : "none",
                        textDecorationThickness: ani === li ? "0.14rem" : "0.1",
                        textDecorationColor: ani === li ? " rgb(0, 255, 225)" : "white",
                     }
                     }
                     value={li} onClick={() => setani(li)}
                     >
                        {li}
                  </li>
               ))}
            </ul>
         </div>


         <div className='Result'>
            {Object.entries(animes).map((t) => {
               if (t[0] === ani) {
                  return (
                        <div className='Top10List' key={String(t[1])}>
                           {t[1].map((animes:topAnimeType, index:number) => (
                              <div className="Topanime-container" key={animes.id} onClick={() => showinfo(animes.id)} /*ref={element}*/  >
                                 <h2 id="topNum">{+animes.number<10?animes.number.slice(1):animes.number}</h2>
                                 <div className='Topanimeimg-wrapper' >
                                    <img id="Topanimeimg" src={animes.poster} />
                                 </div>
                                 <div className="Topanimeinfo" >
                                    <h4 className="TopanimecoverName" >{animes.title.length>28?animes.title.slice(0,28)+"...":animes.title}</h4>
                                    <span id="top10EpisodeType">
                                       <h5 id="top10Sub"><i className="fa-solid fa-closed-captioning"></i>{animes.tvInfo.sub}</h5>
                                       {animes.tvInfo.dub&&<h5 id="top10dub"><i className="fa-solid fa-microphone"></i>{animes.tvInfo.dub}</h5>}
                                    </span>
                                 </div>
                              </div>
                           )
                           )
                           }
                        </div>
                  )
               }
            })}
         </div>
      </div>
   </>
   )
})

export default TopAnimesSection








