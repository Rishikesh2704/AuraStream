'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAnimeinfoQuery } from "@/Redux/Fetchslice";
import { setInfoid, setKeyword } from "@/Redux/StateSlice";
import { useAppDispatch } from "@/Redux/hooks";
import Loading from "@/app/loading";
import Image from "next/image";


export default function AnimeInfo({id}:{id:string | string[] | undefined}) {
    const dispatch = useAppDispatch()
    const [seasons ,setseasons] = useState<seasonAnimeType[]|undefined>()
    // const navigate = useNavigate();

    const { data: qinfo, isLoading} = useAnimeinfoQuery(id as string)

    useEffect(() => {
        if (!isLoading) {
            setseasons(qinfo?.seasons)

        }
    },[qinfo])

   
    const { poster, animeInfo, title } = qinfo?.data || {}
    const { Overview, tvInfo, Genres } = animeInfo || {}
    return (
        <>  
            {seasons&& <div className='ESeasonsDiv'>
                {seasons && <div className="ESeasonsli">
                {seasons.map((season) => (
                    <div className="season" onClick={() => { dispatch(setInfoid(season.id)) 
                    // navigate(`/stream/${season.id}`)
                    }}>
                    <img className={`season-img ${animeInfo?.title === season?.title ? "selectedimg" : ""}`} src={season?.season_poster || season?.poster} />
                    <span className={`season-tag ${animeInfo?.title === season?.title ? "selectedseas" : ""}`}>{season?.title}</span>
                    </div>
                ))}
                </div>}
            </div> } 

            {qinfo  
             ?<div className='stream-info'>
                <div className="EInfo-container" >

                    <div className="eInfo-img">
                        <img id="einfoimg-src" src={poster} alt=""></img>

                    </div>

                    <div className="EWatch-desc">

                        <span onClick={() => { dispatch(setKeyword(title)); }}>{title}</span>

                        <div id="streamep-info">
                            <span id="es1">{tvInfo?.rating}</span>
                            <span id="es2"><i className="fa-solid fa-closed-captioning"></i>{tvInfo?.sub}</span>
                            <span id="es3"><i className="fa-solid fa-microphone"></i>  {tvInfo?.dub }</span>
                        </div>

                        <div className="Egenre-info">
                            {Genres?.map((genre:string,index) =>
                                (<span key={index} id="anime-genre"><Link href={`/genre/${genre.toLowerCase()}`}>{genre}</Link></span>)
                            ) }
                        </div>


                        <div className="desc">
                            <h4>Description</h4>
                            <hr />
                            <span>{Overview}</span>
                        </div>

                    </div>

                  </div> 
                </div> 
            :  <div className="h-full w-full flex flex-col items-center justify-center">
                  <Image src={"/kidzoro.png"} alt="loadingImage" height={150} width={150} />
                  <h1>Loading...</h1>
                </div>}

        </>
    )
}