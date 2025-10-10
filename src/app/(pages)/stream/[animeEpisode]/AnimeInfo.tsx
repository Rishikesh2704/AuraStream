"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAnimeinfoQuery } from "@/Redux/Fetchslice";
import { setInfoid } from "@/Redux/StateSlice";
import { useAppDispatch } from "@/Redux/hooks";
import Loading from "@/app/loading";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AnimeInfo({
  id,
}: {
  id: string | string[] | undefined;
}) {
  const dispatch = useAppDispatch();
  const [seasons, setseasons] = useState<seasonAnimeType[] | undefined>();
  const navigate = useRouter();

  const { data: qinfo, isLoading } = useAnimeinfoQuery(id as string);

  useEffect(() => {
    if (!isLoading) {
      setseasons(qinfo?.seasons);
    }
  }, [qinfo]);

  const { poster, animeInfo, title } = qinfo?.data || {};
  const { Overview, tvInfo, Genres } = animeInfo || {};
  return (
    <>
      {seasons && (
        <article className="ESeasonsDiv">
          {seasons && (
            <div className="ESeasonsli">
              {seasons.map((season) => (
                <figure
                  className="season"
                  onClick={() => {
                    dispatch(setInfoid(season.id));
                    // navigate(`/stream/${season.id}`)
                  }}
                  key={season.id}
                >
                  <img
                    className={`season-img ${
                      animeInfo?.title === season?.title ? "selectedimg" : ""
                    }`}
                    src={season?.season_poster || season?.poster}
                  />
                  <figcaption
                    className={`season-tag ${
                      animeInfo?.title === season?.title ? "selectedseas" : ""
                    }`}
                  >
                    {season?.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </article>
      )}

      {qinfo ? (
        <article className="stream-info">
          <section className="EInfo-container">
            <figure className="eInfo-img" aria-label="Anime-Poster">
              <Image
                id="einfoimg-src"
                src={poster || "kidzoro.png"}
                width={132}
                height={192}
                alt={`${title} poster`}
                unoptimized
              ></Image>
            </figure>

            <section className="EWatch-desc">
              <span onClick={() => navigate.push(`/search/${title}`)}>
                {title}
              </span>

              <div id="streamep-info" role="group" aria-label="Anime details">
                <span id="es1">{tvInfo?.rating}</span>
                <span id="es2">
                  <i className="fa-solid fa-closed-captioning" aria-hidden={true}></i>
                  {tvInfo?.sub}
                </span>
                <span id="es3">
                  <i className="fa-solid fa-microphone" aria-hidden={true}></i> {tvInfo?.dub}
                </span>
              </div>

              <nav className="Egenre-info" aria-label="Anime genres">
                {Genres?.map((genre: string, index) => (
                  <span key={index} id="anime-genre">
                    <Link href={`/genre/${genre.toLowerCase()}`}>{genre}</Link>
                  </span>
                ))}
              </nav>

              <section className="desc" aria-labelledby="Anime-description-heading">
                <h4 id="Anime-description-heading">Description</h4>
                <hr />
                <p>{Overview}</p>
              </section>
            </section>
          </section>
        </article>
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
    </>
  );
}
