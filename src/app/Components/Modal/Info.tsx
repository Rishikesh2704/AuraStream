"use client";

import { useState } from "react";
import useFavorites from "@/Hooks/useFavorites";
import Link from "next/link";
import { setInfoid, setModalState } from "@/Redux/StateSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { auth } from "@/config/Firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

type propsType = {
  aniinfo: InfoTypes | undefined;
  id: string | undefined;
  firstEp?: episodeType | undefined;
};

export default function Info({ aniinfo, id, firstEp }: propsType) {
  const dispatch = useAppDispatch();
  const watchbtnEp = firstEp?.id;
  const userId = auth.currentUser?.uid;

  const { poster, animeInfo, title } = aniinfo?.data || {};
  const { Overview, tvInfo, Genres, Status } = animeInfo || {};
  const { addFavorite, deleteFavorite, isFavorite } = useFavorites(
    userId as string
  );

  const [Favorite, setFavorite] = useState(
    isFavorite(id as string) ? "solid" : "regular"
  );

  const handleFavorite = () => {
    if (userId) {
      let favAnimeObj = {
        name: title,
        poster: poster,
        animeid: id,
      };
      if (Favorite === "regular") {
        addFavorite(favAnimeObj);
      } else if (Favorite === "solid") {
        deleteFavorite(id);
      }
      setFavorite((prev) => (prev === "regular" ? "solid" : "regular"));
    } else {
      alert("Log In To Add Favorites");
    }
  };
  return (
    <>
      {aniinfo ? (
        <section
          className="Info-container"
          aria-label={`Details about ${title}`}
        >
          <div id="backgroundImgWrapper" aria-hidden={true}>
            <img id="backgroundImg" src={poster}></img>
          </div>

          <div className="Img-Container">
            <Image
              id="infoimg-src"
              src={poster || "/kidzoro.png"}
              height={224}
              width={158}
              alt={`${title} poster`}
              unoptimized={true}
            ></Image>
            <button
              onClick={() => handleFavorite()}
              aria-label={
                Favorite === "solid"
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              aria-pressed={Favorite === "solid"}
            >
              <i
                className={`fa-${Favorite} fa-star favorite`}
                aria-hidden={true}
              ></i>
            </button>
          </div>

          <article className="Info">
            <h3>
              <Link
                onClick={() => dispatch(setModalState(false))}
                href={`/search/${title}`}
                aria-label={`Search ${title}`}
                id="title"
              >
                {title}
              </Link>
            </h3>

            <section id="ep-info" aria-label="Anime stats">
              <span id="s">
                {Status === "Finished Airing" ? (
                  <i className="fa-solid fa-check" aria-hidden={true}></i>
                ) : (
                  <i className="fa-solid fa-clock" aria-hidden={true}></i>
                )}
                {Status === "Finished Airing" ? "Completed" : "Ongoing"}
              </span>
              <span id="s1">{tvInfo?.rating}</span>
              <span id="s3">
                <i className="fa-solid fa-microphone" aria-hidden={true}></i>{" "}
                {tvInfo?.dub}
              </span>
              <span id="s2">
                <i
                  className="fa-solid fa-closed-captioning"
                  aria-hidden={true}
                ></i>
                {tvInfo?.sub}
              </span>
            </section>

            <section
              className="genre-info"
              aria-label={`${title} anime genres`}
            >
              {Genres?.map((genre: string, index: number) => (
                <p id="anime-genre" key={index}>
                  <Link
                    href={`/genre/${genre.toLowerCase()}`}
                    aria-label={`Search ${genre} anime`}
                  >
                    {genre}
                  </Link>
                </p>
              ))}
            </section>

            <section
              className="Watch-desc"
              aria-labelledby="Description-heading"
            >
              <Link href={`/stream/${watchbtnEp}`}>
                <button
                  className="Watch-btn"
                  onClick={() => dispatch(setModalState(false))}
                  aria-label={`watch ${title}`}
                >
                  <i className="fa-solid fa-play" aria-hidden={true}></i>
                  Watch Now
                </button>
              </Link>
              <h2 id="Description-heading">Description</h2>

              <hr />
              <div className="desc">
                <span>{Overview}</span>
              </div>
            </section>
          </article>
        </section>
      ) : (
        <h2></h2>
      )}

      {aniinfo?.seasons && (
        <section className="Seasonsli" aria-label="Seasons List">
          {aniinfo?.seasons.map((season) => (
            <button
              key={season.id}
              className="season"
              onClick={() => {
                dispatch(setInfoid(season.id));
              }}
              aria-label={`View details for ${season.title}`}
            >
              <img
                className={`season-img ${
                  animeInfo?.title === season.title ? "selectedimg" : ""
                }`}
                src={season.season_poster}
              />
              <span
                className={`season-tag ${
                  animeInfo?.title === season.title ? "selectedseas" : ""
                }`}
              >
                {season.title}
              </span>
            </button>
          ))}
        </section>
      )}
    </>
  );
}
