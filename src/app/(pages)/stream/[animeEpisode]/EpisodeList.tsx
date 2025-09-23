'use client'
import { useEffect, useState } from "react"
import Link from "next/link";
import { useEplistQuery } from "@/Redux/Fetchslice";
import { useAppSelector } from "@/Redux/hooks";
import { skipToken } from "@reduxjs/toolkit/query";

type propsType = {
    id:string|string[]|undefined,
    epid:string|null,
    // setcurrep:(ep:episodeType|undefined)=>void
}

export default function EpisodeList({id,epid,}: propsType) { {/* setcurrep */}
    const {infoid} = useAppSelector((state) => state.states)
    const [rangeindex, setrangeindex] = useState(0)
    const [eplist, seteplist] = useState<episodeType[]|undefined>([])
    
    const {data:qEpli, isLoading:epliLoading , error: epliError} =  useEplistQuery((infoid||id) ?? skipToken)
    useEffect(()=>{
      if(!epliLoading){
        seteplist(qEpli?.episodes)
      }
    },[id,qEpli])
   
    useEffect(()=>{
      if(!epliLoading && epid){
          let selectedEpisode = qEpli?.episodes?.find((epno:episodeType) => {
            return String(epno.id.split("=")[1]) === String(epid)
          })

        //   setcurrep(selectedEpisode)
      }
    },[epid])
    
    
    /*********************FUNCTIONS*************************/

    //Changing BackgroundColor Of Selected Episode
    const handleselect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        let styleep = document.getElementsByClassName('style')[0]
        if (styleep) {
            styleep.classList.remove("style")
        }
        e.currentTarget.parentElement?.classList.add("style")
    }

    //For Grouping Range of EpisodeList
    const groupedep = (episodelist:episodeType[]) => {
        let epgroup = []
        const range = 100;
        for (let i = 0; i < episodelist.length; i += range) {
            epgroup.push(episodelist.slice(i, i + range))
        }
        return epgroup
    }

    const groupep = groupedep(eplist??[])

    // Changing Range of Episodes
    const changerange = (e: React.ChangeEvent<HTMLSelectElement>) => {         
        const selectedrange = e.target.value.split("-")[0];
        setrangeindex((+selectedrange - 1) / 100)
    }

    return (
        <>
            {eplist && <div className="Epstream-list">

                <div className='Episodetag-range'>
                    <h4 id="Epstreamlist-tag">Episodes</h4>
                    {eplist.length > 100 && <select onChange={(e) => { changerange(e) }} id="Epstream-rangesselection">
                        {groupep.map((_, index) =>
                            (<option >{index * 100 + 1} -  {(index + 1) * 100}</option>)
                        )}
                    </select>}
                </div>
                <hr />

                <div className='stream-episodes'>
                    {eplist.length > 1 && eplist.length > 25
                        ? <div className="Epstream-grid">
                            {eplist.length > 1 && groupep[rangeindex].map((ep,index) => (
                                <p key={index} className={`epn ${epid == ep.id.split('=')[1] ? "style" : ""} ${ep.filler ? "filler" : ""}`}><Link href={`/stream/${ep.id}`} id="ep" onClick={(e) => handleselect(e)} ><div className="eplist-num">{`Ep ${ep.episode_no}`}</div></Link></p>
                                //  ${epid == ep.id.split('=')[1] ? "style" : ""}

                            ))}
                        </div>
                        : <div className="SEpstream-grid">
                            {eplist.length > 1 && groupep[rangeindex].map((ep,index) => (
                                //  ${epid == ep.id.split('=')[1] ? "style" : ""}
                                <p key={index} className={`epn ${epid == ep.id.split('=')[1] ? "style" : ""} ${ep.filler ? "filler" : ""}`} ><Link href={`/stream/${ep.id}`} id="ep" onClick={(e) => handleselect(e)} ><span className="seplist-num">{`Ep ${ep.episode_no}: ${ep.title}`}</span></Link></p>

                            ))}
                        </div>
                    }
                </div>

            </div>}
        </>
    )
}