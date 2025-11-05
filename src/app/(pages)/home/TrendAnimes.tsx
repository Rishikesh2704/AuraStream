import { memo, useRef } from "react";
import { setInfoid, setModalState } from "@/Redux/StateSlice";
import { useAppDispatch } from "@/Redux/hooks";
import Image from "next/image";

const TrendAnimes = memo((props: { animes: animeType[] }) => {
  const { animes } = props;
  const dispatch = useAppDispatch();
  const element = useRef(null);
  const trendContent = useRef<HTMLDivElement>(null);
  const trendContainer = useRef<HTMLDivElement>(null);

  /*********************Functions **********************/

  const handleMouseOverElement = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    // Hover Animation //
    let img = e.target as HTMLDivElement;
    let animeimg = img.querySelector("img") as HTMLImageElement;

    e.currentTarget.style.transition = "0.3s ease-out";

    if (animeimg) {
      animeimg.style.transition = "0.3s ease-out";
      animeimg.style.transform = "scale(1.1)";
    }

    img.style.setProperty("--heightofcover", "23.1rem");
    img.style.setProperty("--widthofcover", "16.5rem");
    img.style.setProperty("--transformcover", "1.1");
    img.style.setProperty("--tanslateX", "-0.75rem");
    img.style.setProperty("--tanslateY", "-0.2rem");
    e.currentTarget.style.bottom = "1rem";
  };

  const handleMouseOutElement = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    // Hover-out Animation //
    let img = e.target as HTMLDivElement;
    let animeimg = img?.querySelector("img") as HTMLImageElement;

    if (animeimg) {
      animeimg.style.transition = "0.4s ease-out";
      animeimg.style.transform = "scale(1)";
    }

    e.currentTarget.style.bottom = "0rem";
    img.style.setProperty("--heightofcover", "21.8rem");
    img.style.setProperty("--widthofcover", "15rem");
    img.style.setProperty("--transformcover", "1");
    img.style.setProperty("--tanslateX", "0rem");
    img.style.setProperty("--tanslateY", "0rem");
  };

  const showinfo = (id: string) => {
    dispatch(setModalState(true));
    let modal = document.getElementsByClassName("Modal-contentbox");
    dispatch(setInfoid(id));
  };

  let slide = 0;

  const handleNextSlide = () => {
    let trendcontainer = trendContent.current as HTMLDivElement;
    slide += 25;
    if (slide > 65) {
      slide = 65;
    }
    trendcontainer.style.transform = `translateX(-${slide}%)`;
  };

  const handlePrevSlide = () => {
    let trendcontainer = trendContent.current as HTMLDivElement;
    slide -= 30;
    if (slide < 10) {
      slide = 0;
    }
    trendcontainer.style.transform = `translateX(-${slide}%)`;
  };

  return (
    <>
      <header className="CName" aria-labelledby="trendH2">
        <h2 id="trendH2">Trending</h2>
      </header>

      <section
        className="trendingCategory"
        aria-label="TrendingAnimes"
        ref={trendContainer}
      >
        <div className="Trending-Main" tabIndex={0}>
          <button
            className="PrevBtn"
            aria-label="Next TrendAnimes"
            onClick={() => handlePrevSlide()}
          >
            <i
              className="fa-solid fa-chevron-left"
              aria-hidden={true}
              onClick={() => handlePrevSlide()}
            ></i>
          </button>
          <button
            className="NextBtn"
            aria-label="Previous TrendAnimes"
            onClick={() => handleNextSlide()}
          >
            <i
              className="fa-solid fa-chevron-right"
              aria-hidden={true}
              onClick={() => handleNextSlide()}
            ></i>
          </button>
          <div className="trendingContainer" ref={trendContent}>
            {animes.map((anime: animeType) => {
                  {console.log(anime)}

              return (
                <article
                  className="element-container"
                  key={anime.id}
                  data-label={anime.id}
                  onClick={() => showinfo(anime.id)}
                  ref={element}
                  onMouseOver={(e) => handleMouseOverElement(e)}
                  onMouseOut={(e) => handleMouseOutElement(e)}
                >
                  <figure className="img" role="button" tabIndex={0}>
                    <Image
                      id="elementimg"
                      src={anime.poster || "/kidzoro.png"}
                      height={400}
                      width={300}
                      loading="lazy"
                      alt={
                        anime.title.length > 25
                          ? anime.title.slice(0, 26) + "poster"
                          : anime.title + " poster"
                      }
                      unoptimized={true}
                      tabIndex={8}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          showinfo(anime.id);
                        }
                      }}
                    />
                  </figure>


                  <span className="info">
                    <h3 className="coverName">{anime.title}</h3>
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
});

export default TrendAnimes;
