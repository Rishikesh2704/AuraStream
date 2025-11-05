"use client";
import { useEffect, useRef } from "react";

export default function LoadingPage() {
  const loadingList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let covers = () => {
      for (let index = 0; index < 30; index++) {
        let element = document.createElement("div");
        element.className = "loadingCover";
        if (loadingList.current) {
          loadingList.current?.appendChild(element);
        }
      }
    };
    covers();
  });

  return (
    <>
      <div className="Search-container">
        <div className="CName">
          <h2>Trending</h2>
        </div>

        <div className="Result">
          <div className="Loading-List" ref={loadingList}>
            <div className="loadingCover"></div>
          </div>
        </div>
      </div>
    </>
  );
}
