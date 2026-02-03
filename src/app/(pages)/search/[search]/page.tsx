"use client";
import { useState, useEffect } from "react";
import Modal from "@/app/Components/Modal/Modal";
import { useAnimesearchInfiniteQuery } from "@/Redux/Fetchslice";
import ListLayout from "@/app/Components/ListLayout";
import { useAppSelector } from "@/Redux/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import AuhtUI from "@/app/Authentication/AuthUI";

export default function search() {
  const { modalState, infoid, authModalState } = useAppSelector((state) => state.states);
  const [Search, setSearch] = useState<animeType[]>();
  const location = usePathname();
  const navigate = useRouter();
  const params = useParams() as { search: string };
  const keyword = decodeURI(params.search);

  let name = location.split("/");
  let currgen;
  name[1] = location.slice(1);
  currgen = name[1].split("/")[1];

  const { data, isLoading, fetchNextPage } = useAnimesearchInfiniteQuery(
    keyword ?? skipToken,
  );

  // SCROLL END FUNCTION //

  // SETTING SEARCH ANIMES STATE //
  useEffect(() => {
    if (!isLoading) {
      console.log(keyword);
      let animes = data?.pages.map((page) => page.data).flat(); //No Page Parameter in th API for Search
      setSearch(animes);
    }
    return () => {
      setSearch([]);
    };
  }, [isLoading, data, keyword]);

  // INFINITE SCROLL //
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const scrollFunction = () => {
      if (
        name[1].split("/")[0] === "search" &&
        body &&
        window.scrollY + window.innerHeight + 150 >= body.scrollHeight
      ) {
        fetchNextPage();
      }
    };
    if (keyword === "") {
      navigate.push("");
    }
    if (name[1].split("/")[0] === "search" && body) {
      document.addEventListener("scroll", scrollFunction);
    }

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, [keyword]);

  // LOADING COVERS //
  useEffect(() => {
    if (isLoading && keyword !== " ") {
      for (let i = 0; i <= 35; i++) {
        let LoadingDiv = document.createElement("div");
        LoadingDiv.className = "loadingCover";
        let home = document.getElementsByClassName("Loading-List")[0];
        home && home.prepend(LoadingDiv);
      }
    }
    return () => {};
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[97vw] flex flex-col items-center justify-center">
        <Image
          src={"/kidzoro.png"}
          alt="loadingImage"
          height={150}
          width={150}
        />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <ListLayout
        Animes={Search}
        heading="Search Results"
        isLoading={isLoading}
      />
      {modalState && <Modal id={infoid} />}
      {authModalState && <AuhtUI />}
    </main>
  );
}
