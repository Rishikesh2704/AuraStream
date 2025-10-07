// import {useState} from 'react'
// import { useParams,useSearchParams,useNavigate } from "react-router-dom"
// import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/video.css';
// import '@vidstack/react/player/styles/base.css';
// import '@vidstack/react/player/styles/plyr/theme.css';
import AnimeInfo from "./AnimeInfo";
import EpisodeList from "./EpisodeList";
import VideoPlayer from "./VideoPlayer";
import Servers from "./Servers";
// import { useParams, useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';

type serverType = {
  serverName: string;
  type: string;
};
type propsType = {
  params: Promise<{ animeEpisode: string }>;
  searchParams: Promise<{ ep: string }>;
};

export default async function Epstream({ params, searchParams }: propsType) {
  // const [currep, setcurrep] = useState<episodeType | undefined>()
  // const [currserv, setcurrserv] = useState<serverType>({serverName:"HD-1",type:"sub"})
  // const [nextep, setnextep] = useState<episodeType | undefined>()
  // const [prevep, setprevep] = useState<episodeType | undefined>()

  // const animeid = useSearchParams()
  // const  {animeEpisode:id}  = useParams();

  // let epid:string | null = animeid.get('ep');
  // let navigate = useRouter();

  //    const id = (await params).animeEpisode
  //    const epid = (await searchParams).ep

  // useEffect(() => {
  //   let newep = currep.number + 1
  //   let newprevep = currep.number - 1
  //   setnextep(eplist.find(epno => {
  //     return epno.number === newep
  //   }))
  //   setprevep(eplist.find(epno => {
  //     return epno.number === newprevep
  //   }))
  // }, [currep, eplist])

  // const handleprev = () => {
  //    if (prevep) { navigate.push(`/stream/${prevep.episodeId}`) }
  // }

  // const handlenext = () => {
  //    if (nextep) { navigate.push(`/stream/${nextep.episodeId}`) }
  // }

  const id = (await params).animeEpisode;
  const epid = (await searchParams).ep;

  return (
    <>
      <main className="Container">
        <section className="Stream-container">
          <div className="Video-container">
            {
              <div className="Ep-stream">
                {/* <VideoPlayer id={id} epid={epid} currserv={currserv} />  */}

                {/* <div className='Ep-btns'>
                     <button className="prev" onClick={handleprev}>Prev Ep</button>
                     <button className="next" onClick={handlenext}>Next Ep</button>
                  </div> */}
              </div>
            }
            <EpisodeList id={id} epid={epid} /> {/* setcurrep={setcurrep} */}
            <Servers epid={epid} id={id} />{" "}
            {/* currserv={currserv} setcurrserv={setcurrserv} currep={currep} */}
          </div>

          <AnimeInfo id={id} />
        </section>
      </main>
    </>
  );
}
