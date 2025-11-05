"use client";
import { useState, memo, useEffect } from "react";
import { setInfoid, setModalState } from "@/Redux/StateSlice";
import { useAppDispatch } from "@/Redux/hooks";
import Image from "next/image";

type topAnimeType = {
  id: string;
  number: string;
  poster: string;
  title: string;
  tvInfo: {
    dub: string;
    sub: string;
  };
};

type propsType = {
  month: topAnimeType[];
  today: topAnimeType[];
  week: topAnimeType[];
};

const TopAnimesSection = memo((props: { animes: propsType }) => {
  const [isMobile, setisMobile] = useState(false);
  const dispatch = useAppDispatch();
  const { animes } = props;
  const [ani, setani] = useState("today");

  const showinfo = (id: string) => {
    dispatch(setModalState(true));
    dispatch(setInfoid(id));
  };

  useEffect(() => {
    const mediaquery = window.matchMedia("(max-width:600px)");
    setisMobile(() => (mediaquery?.matches ? true : false));
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const topAnime = e.target as HTMLElement;
    const topAnimeTitle = topAnime.firstChild as HTMLElement;
    topAnimeTitle.style.left = "-6.5rem";
  };
  const handleMouseOut = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const topAnime = e.target as HTMLElement;
    const topAnimeTitle = topAnime.firstChild as HTMLElement;
    topAnimeTitle.style.left = "0rem";
  };

  return (
    <>
      <section className="Top10" role="region">
        <header className="Top10CName">
          <h2 id="Top10Tag">Top 10</h2>
          <ul id="top10">
            {Object.keys(animes).map((li, index) => (
              <li
                className={ani !== li ? "top10Category" : " "}
                key={index}
                id={`li${index}`}
                style={{
                  textDecoration: ani === li ? "underline" : "none",
                  textUnderlineOffset:
                    ani === li ? (isMobile ? "0.6rem" : "0.75rem") : "none",
                  textDecorationThickness: ani === li ? "0.14rem" : "0.1",
                  textDecorationColor:
                    ani === li ? " rgb(0, 255, 225)" : "white",
                }}
                value={li}
                onClick={() => setani(li)}
              >
                {li}
              </li>
            ))}
          </ul>
        </header>

        <div className="Result" aria-label="Topanimes-list">
          {Object.entries(animes).map((t) => {
            if (t[0] === ani) {
              return (
                <section className="Top10List" key={String(t[1])}>
                  {t[1].map((animes: topAnimeType, index: number) => (
                    <section
                      className="Topanime-container"
                      key={animes.id}
                      onClick={() => showinfo(animes.id)} 
                      onMouseOver={(e) => handleMouseOver(e)}
                      onMouseOut={(e) => handleMouseOut(e)}
                    >
                      <h2 id="Top_Tag">{animes.title}</h2>
                      <span
                        id="topNum"
                        style={{
                          backgroundImage: `url(${animes.poster})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        {+animes.number < 10
                          ? "0" + animes.number.slice(1)
                          : animes.number}
                      </span>
                      <figure className="Topanimeimg-wrapper">
                        <Image
                          id="Topanimeimg"
                          alt={animes.title + "poster"}
                          src={animes.poster || "/kidzoro.png"}
                          loading="lazy"
                          height={400}
                          width={300}
                          fetchPriority="low"
                          unoptimized={true}
                        />
                      </figure>
                      {/* <article className="Topanimeinfo" >
                                    <h2 className="TopanimecoverName" >{animes.title.length>28?animes.title.slice(0,28)+"...":animes.title}</h2>
                                    <span id="top10EpisodeType">
                                       <span id="top10Sub"><i className="fa-solid fa-closed-captioning"></i>{animes.tvInfo.sub}</span>
                                       {animes.tvInfo.dub&&<span id="top10dub"><i className="fa-solid fa-microphone"></i>{animes.tvInfo.dub}</span>}
                                    </span>
                                 </article> */}
                    </section>
                  ))}
                </section>
              );
            }
          })}
        </div>
      </section>
    </>
  );
});

export default TopAnimesSection;
