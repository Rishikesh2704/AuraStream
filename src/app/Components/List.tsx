"use client";
import { usePathname } from "next/navigation";
import AnimeCard from "./AnimeCard";

type propsType = {
  anime: animeType[];
  next?: string;
  height?: string;
};

export default function List(props: propsType) {
  const { anime ,height} = props;
  const location = usePathname();

  let name = location.split("/");
  let currgen;
  let style ={};
  if (name[1] === "genre" || name[1] !== " ") {
    name[1] = location.slice(1);
    currgen = name[1].split("/")[1];
  }

  if (name[1] !== "Home" && name[1]!== "") {
    style = {
      maxHeight:height
    };
  }

  return (
    <>
      <article className="Anime-List "
       style={style}
      >
        {anime &&
          anime?.map((ani) => (
            <AnimeCard
              key={ani.id}
              name={ani?.title}
              img={ani?.poster}
              id={ani?.id}
              sub={ani.tvInfo.sub}
              type={ani.tvInfo.showType}
              duration={ani.tvInfo.duration}
            />
          ))}
      </article>
    </>
  );
}
