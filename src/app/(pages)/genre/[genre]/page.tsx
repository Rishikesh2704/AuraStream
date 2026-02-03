"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/Components/Modal/Modal";
import { useGenreAnimeInfiniteQuery } from "@/Redux/Fetchslice";
import ListLayout from "@/app/Components/ListLayout";
import { useAppSelector } from "@/Redux/hooks";
import { usePathname } from "next/navigation";
import AuhtUI from "@/app/Authentication/AuthUI";

export default function GenreAnimePage() {
  const { modalState, infoid, authModalState } = useAppSelector(
    (state) => state.states,
  );

  const [Genre, setGenre] = useState<animeType[]>();
  const location = usePathname();

  let name = location.split("/");
  let currgen;
  name[1] = location.slice(1);
  currgen = name[1].split("/")[1];

  // FETCHING GENRE ANIMES//
  const { data, isLoading, fetchNextPage } =
    useGenreAnimeInfiniteQuery(currgen);

  // // SETTING GENRE ANIMES STATE //
  useEffect(() => {
    if (!isLoading && name[1].split("/")[0] === "genre") {
      let animes = data?.pages.map((pageAnimes) => pageAnimes.data)?.flat();
      setGenre(animes);
    }
    return () => {
      setGenre([]);
    };
  }, [data, currgen]);

  // SCROLL END FUNCTION //
  const scrollFunction = () => {
    const body = document.getElementsByTagName("body")[0];

    if (body) {
      if (
        name[1].split("/")[0] === "genre" &&
        window.scrollY + window.innerHeight + 150 >= body.scrollHeight
      ) {
        fetchNextPage();
      }
    }
  };

  // INFINITE SCROLL //
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    try {
      if (name[1].split("/")[0] === "genre" && body) {
        document.addEventListener("scroll", scrollFunction);
      }
    } catch (err) {
      console.log(err);
    }
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [name[1]]);

  // LOADING COVERS //
  useEffect(() => {
    if (isLoading) {
      for (let i = 0; i <= 35; i++) {
        let LoadingDiv = document.createElement("div");
        LoadingDiv.className = "loadingCover";
        let home = document.getElementsByClassName("Loading-List")[0];
        home && home.prepend(LoadingDiv);
      }
    }
    return () => {};
  }, []);

  return (
    <main>
      <ListLayout Animes={Genre} heading={currgen} isLoading={isLoading} />
      {modalState && <Modal id={infoid} />}
      {authModalState && <AuhtUI />}
    </main>
  );
}
