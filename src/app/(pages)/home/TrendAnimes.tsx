import { memo, useEffect, useRef } from "react";
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
    const carousel = trendContent.current as HTMLDivElement

    e.currentTarget.style.transition = "0.3s ease-out";

    if (animeimg) {
      animeimg.style.transition = "0.3s ease-out";
      animeimg.style.transform = "scale(1.1)";
    }

    carousel.style.animationPlayState = "paused"
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
    let img = e.target as HTMLDivElement;
    let animeimg = img?.querySelector("img") as HTMLImageElement;
    const carousel = trendContent.current as HTMLDivElement

    if (animeimg) {
      animeimg.style.transition = "0.4s ease-out";
      animeimg.style.transform = "scale(1)";
    }

    carousel.style.animationPlayState = "running"
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
         
          <div className="trendingContainer" ref={trendContent}>
            {[...animes,...animes].map((anime: animeType) => {

              return (
                <article
                  className="element-container"
                  key={anime.id + Math.random()}
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
