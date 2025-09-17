import { memo } from "react";

import { useEffect, useRef, useState } from "react";
import { useAnimeinfoQuery } from "../../Redux/Fetchslice";
import Navbar from "../Navbar";
import { setInfoid, setModalState } from "../../Redux/StateSlice";
import MobileNavbar from "../Mobile/MobileNavbar";
import { useAppDispatch } from "../../Redux/hooks";
import Image from "next/image";

const SpotLightSection = memo(
  ({
    spotlightCoverAnimes,
  }: {
    spotlightCoverAnimes: spotlightAnimeTypes[];
  }) => {
    const mediaQuery = window.matchMedia("(max-width:600px)");
    const dispatch = useAppDispatch();
    const [sliderem, setSliderem] = useState<number>(0);
    const [animeimg, setanimeimg] = useState<string[]>([]);
    const [currentindx, setcurrentindx] = useState(0);

    const grid = useRef<HTMLDivElement>(null);
    const spotlightimgContRef = useRef<HTMLDivElement>(null);

    const id = spotlightCoverAnimes.map((ani) => ani.id);
    let fetchingid = id[currentindx];
    const { data } = useAnimeinfoQuery(fetchingid);

    const currentrem = useRef(0);

    useEffect(() => {
      if (spotlightimgContRef.current) {
        setSliderem(spotlightimgContRef.current.offsetWidth / 16);
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
        {mediaQuery.matches ? <MobileNavbar /> : <Navbar />}

        <div className="Slider-Container">
          <button
            className="CoverPrevBtn"
            onClick={() => {
              handlePrevCover();
            }}
          >
            <i className="fa-solid fa-chevron-left" role="button"></i>
          </button>

          <div className="Animes-Container">
            <div className="Slide-Images" ref={grid}>
              {spotlightCoverAnimes.map((spotlight, idx: number) => (
                <>
                  <div
                    className="SpotlightAnime-container"
                    ref={spotlightimgContRef}
                    key={spotlight.id + idx}
                  >
                    <div className="Cover">
                      <div className="CoverDark"></div>
                      <Image
                        src={spotlight.poster || "/Bakugou.gif"}
                        width="963"
                        height="541"
                        alt={spotlight.title}
                        priority={true}
                      ></Image>
                    </div>

                    <div
                      className="Cover-Info"
                      style={
                        {
                          // bottom: idx === 7 ? "60%" : `${mediaQuery.matches ? 82 : 52}%`,
                        }
                      }
                    >
                      <div className="Title">
                        {
                          <Image
                            id="Coverimg-src"
                            width={300}
                            height={400}
                            src={animeimg[idx] ?? "/Bakugou.gif"}
                            alt={spotlight.title}
                            priority={true}
                            onClick={() => handleModal(spotlight.id)}
                          />
                        }

                        <p>{spotlight.title}</p>
                      </div>

                      <div id="ep-info">
                        {Object.entries(spotlight.tvInfo)
                          .filter(([key]) => key !== "episodeInfo")
                          .map(([key, value], idx) => (
                            <span id="Cover" key={idx + 1}>
                              {value as string}
                            </span>
                          ))}

                        {Object.entries(spotlight.tvInfo).map((info) => {
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
                        })}
                      </div>

                      <span>
                        {spotlight?.description.slice(
                          0,
                          mediaQuery.matches ? 150 : 498
                        )}
                        ...
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <button
            className="CoverNextBtn"
            onClick={() => {
              handleNextCover();
            }}
          >
            <i className="fa-solid fa-chevron-right " role="button"></i>
          </button>
        </div>
      </>
    );
  }
);

export default SpotLightSection;
