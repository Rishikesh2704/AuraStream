"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useAnimeinfoQuery, useEplistQuery } from "../../../Redux/Fetchslice";
import { setModalState } from "../../../Redux/StateSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import EpisodeList from "./EpisodeList";
import Info from "./Info";
import InfoSkeleton from "@/app/SkeletonComps/InfoSkeleton";

export default function Modal(props: { id: string }) {
  const { id } = props;
  const [Favorite, setFavorite] = useState<string>("regular");
  const { infoid } = useAppSelector((id) => id.states);

  const dispatch = useAppDispatch();
  const modalBox = useRef<HTMLDivElement>(null);

  const { data: aniinfo } = useAnimeinfoQuery(id);
  const { data: eplist } = useEplistQuery(id);

  const { episodes } = eplist ?? {};

  useEffect(() => {
    let body = document.getElementsByTagName("body")[0];
    body.style.setProperty("--homescroll", "hidden");

    let isFavorite = localStorage.getItem("Favorites")?.includes(infoid);
    isFavorite ? setFavorite("solid") : setFavorite("regular");

    return () => {
      body.style.setProperty("--homescroll", "scroll");
    };
  }, [id]);

  const handlemodal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList[0] == "Modal-bg") {
      let animation = [
        {
          transform: "translate(0,0rem)",
          opacity: 1,
        },
        {
          transform: "translate(0,-16rem)",
          opacity: 0.3,
        },
        {
          transform: "translate(0,-30rem)",
          opacity: 0.1,
        },
      ];

      modalBox.current?.animate(animation, { duration: 200 });
      setTimeout(() => {
        dispatch(setModalState(false));
      }, 190);
    }
  };

  return (
    <>
      <div
        className="Modal-bg"
        onClick={(e) => handlemodal(e)}
        aria-modal={true}
        role="dialog"
      >
        <main className="Modal-contentbox-main" ref={modalBox}>
          <section className="Modal-contentbox">
            {aniinfo ? (
              <Info
                aniinfo={aniinfo}
                id={id}
                firstEp={episodes && episodes[0]}
              />
            ) : (
              <InfoSkeleton />
            )}
            <EpisodeList eplist={eplist} />
          </section>
        </main>
      </div>
    </>
  );
}
