"use client";

import { useState } from "react";
import useFavorites from "@/Hooks/useFavorites";
import Link from "next/link";
import { setInfoid, setModalState } from "@/Redux/StateSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { auth } from "@/config/Firebase";
import Loading from "@/app/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";

type propsType = {
  aniinfo: InfoTypes | undefined;
  id: string | undefined;
  firstEp?: episodeType | undefined;
};

export default function Info({ aniinfo, id, firstEp }: propsType) {
  const dispatch = useAppDispatch();
  const navigate = useRouter()
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
        <div className="Info-container">
          <div id="backgroundImgWrapper">
            <img id="backgroundImg" src={poster}></img>
          </div>
          <div className="Img-Container">
            <Image id="infoimg-src" src={poster || "/kidzoro.png"} height={400} width={300} alt="" unoptimized={true}></Image>
            <button onClick={() => handleFavorite()}>
              <i className={`fa-${Favorite} fa-star favorite`}></i>
            </button>
          </div>

          <div className="Info">
            <p
              onClick={() => {
                navigate.push(`/search/${animeInfo?.title}`)
                dispatch(setModalState(false));
              }}
            >
              {title}
            </p>

            <div id="ep-info">
              <span id="s">
                {Status === "Finished Airing" ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-clock"></i>
                )}
                {Status === "Finished Airing" ? "Completed" : "Ongoing"}
              </span>
              <span id="s1">{tvInfo?.rating}</span>
              <span id="s3">
                <i className="fa-solid fa-microphone"></i> {tvInfo?.dub}
              </span>
              <span id="s2">
                <i className="fa-solid fa-closed-captioning"></i>
                {tvInfo?.sub}
              </span>
            </div>

            <div className="genre-info">
              {Genres?.map((genre: string, index: number) => (
                <p id="anime-genre" key={index}>
                  <Link href={`/genre/${genre.toLowerCase()}`}>{genre}</Link>
                </p>
              ))}
            </div>

            <div className="Watch-desc">
              <Link href={`/stream/${watchbtnEp}`}>
                <button
                  className="Watch-btn"
                  onClick={() => dispatch(setModalState(false))}
                >
                  <i className="fa-solid fa-play"></i> Watch Now
                </button>
              </Link>
              <h4>Description</h4>

              <hr />
              <div className="desc">
                <>
                  <span>{Overview}</span>
                </>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <Image
            src={"/kidzoro.png"}
            alt="loadingImage"
            height={150}
            width={150}
            unoptimized={true}
          />
          <h1>Loading...</h1>
        </div>
      )}
      {aniinfo?.seasons && (
        <div className="Seasonsli">
          {aniinfo?.seasons.map((season) => (
            <div
              key={season.id}
              className="season"
              onClick={() => {
                dispatch(setInfoid(season.id));
              }}
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}
