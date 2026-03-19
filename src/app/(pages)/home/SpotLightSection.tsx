"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimeinfoQuery } from "../../../Redux/Fetchslice";
import Navbar from "@/app/Components/Navbar/Navbar";
import { setInfoid, setModalState } from "../../../Redux/StateSlice";
import MobileNavbar from "@/app/Mobile/MobileNavbar";
import { useAppDispatch } from "../../../Redux/hooks";
import Image from "next/image";

const SpotLightSection = ({
  spotlightCoverAnimes,
}: {
  spotlightCoverAnimes: spotlightAnimeTypes[];
}) => {
  const dispatch = useAppDispatch();
  const [sliderem, setSliderem] = useState<number>(0);
  const [animeimg, setanimeimg] = useState<string[]>([]);
  const [currentindx, setcurrentindx] = useState(0);
  const [isMobile, setisMobile] = useState(false);
  const icons = ["fa-tv","fa-clock", 'fa-calendar'];

  const spotlightAnimeRef = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const spotlightimgContRef = useRef<HTMLDivElement>(null);
  
  const id = spotlightCoverAnimes.map((ani) => ani.id);
  let fetchingid = id[currentindx];
  const { data } = useAnimeinfoQuery(fetchingid);

  const currentrem = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:600px)");
    setisMobile(() => (mediaQuery?.matches ? true : false));
    if (spotlightimgContRef.current) {
      const widthOfSpotlight = spotlightimgContRef.current.offsetWidth;
      setSliderem(widthOfSpotlight / 16);
    }
    if (data?.data?.poster) {
      setanimeimg((prev) => [...prev, data.data.poster]);
      if (currentindx <= id.length) setcurrentindx((prev) => prev + 1);
    }
  }, [data]);

  const handleNextCover = () => {
    if (currentrem.current < sliderem * 7) {
      currentrem.current += sliderem;
      grid.current?.style.setProperty(
        "--changeCover",
        `-${currentrem.current}rem`
      );
    }
  };
  const handlePrevCover = () => {
    if (currentrem.current >= 1) {
      currentrem.current -= sliderem;
      grid.current?.style.setProperty(
        "--changeCover",
        `-${currentrem.current}rem`
      );
    }
  };

  const handleModal = (spotlightId: string) => {
    dispatch(setInfoid(spotlightId));
    dispatch(setModalState(true));
  };

  return (
    <>
       {isMobile ? <MobileNavbar /> : <Navbar />}

      <section className="Slider-Container" role="region">
        <button
          className="CoverPrevBtn"
          onClick={() => {
            handlePrevCover();
          }}
          aria-label="PreviousSpotlight button"
        >
          <i className="fa-solid fa-chevron-left" aria-hidden={true}></i>
        </button>

        <section className="Animes-Container">
          <div className="Slide-Images" id="Carousel" ref={grid}>
            {spotlightCoverAnimes.map((spotlight, idx: number) => (
              <div
                className="SpotlightAnime-container"
                id= "CaouselBgImg"
                ref={spotlightimgContRef}
                key={spotlight.id + idx}
                onClick={() => handleModal(spotlight.id)}
              >
                <figure className="Cover">
                  <div className="CoverDark"></div>
                  <Image
                    src={spotlight.poster || "/kidzoro.png"}
                    fetchPriority="high"
                    priority={idx !== 0 ? false : true}
                    width="400"
                    height="980"
                    alt=""
                    aria-hidden={true}
                    loading={idx !== 0 ? "lazy" : "eager"}
                    unoptimized={true}
                    tabIndex={6}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleModal(spotlight.id);
                      }
                    }}
                  ></Image>
                </figure>

                <article
                  className="Cover-Info"
                >
                  <figure className="Title" ref={spotlightAnimeRef}>
                    {/* {
                      <Image
                        id="Coverimg-src"
                        width={80}
                        height={48}
                        src={animeimg[idx] || "/kidzoro.png"}
                        alt={spotlight.title + "poster"}
                        loading="eager"
                        priority={true}
                        onClick={() => handleModal(spotlight.id)}
                        unoptimized={true}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleModal(spotlight.id);
                          }
                        }}
                      />
                    } */}

                    <section id="ep-info">
                      <figcaption>{spotlight.title}</figcaption>

                      {Object.entries(spotlight.tvInfo)
                        .filter(([key]) => key !== "episodeInfo")
                        .map(([key, value], idx) => (
                          <span id="Cover" key={idx + 1}>
                            <i
                              className={idx<3?`fa-solid ${icons[idx]}`:' '}
                            />{" "}
                            {value as string}
                          </span>
                        ))}

                      {/* {Object.entries(spotlight.tvInfo).map((info) => {
                        if (info[0] === "episodeInfo") {
                          return Object.entries(info[1]).map(
                            (ep, idx) =>
                              ep[1] && (
                                <span id="Cover" key={idx + 1}>
                                  <i
                                    className={
                                      ep[0] === "sub"
                                        ? "fa-solid fa-closed-captioning"
                                        : "fa-solid fa-microphone"
                                    }
                                  />{" "}
                                  {ep[1]}
                                </span>
                              )
                          );
                        }
                      })} */}

                    
                    </section>
                    
                  </figure>

                  <p>
                    {spotlight?.description.slice(0, isMobile ? 150 : 348)}
                    ...
                  </p>
                    <button
                        className="SpotlightWatch-btn"
                        onClick={() => dispatch(setModalState(false))}
                        aria-label={`watch ${spotlight.title}`}
                      >
                        <i className="fa-solid fa-play" aria-hidden={true}></i>{" "}
                        Watch
                      </button>
                </article>
                
              </div>
              
            ))}
          </div>
        </section>

        <button
          className="CoverNextBtn"
          onClick={() => {
            handleNextCover();
          }}
          aria-label="NextSpotlight button"
        >
          <i className="fa-solid fa-chevron-right" aria-hidden={true}></i>
        </button>
      </section>
    </>
  );
};

export default SpotLightSection;
