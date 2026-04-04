"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import List from "../../Components/List";
export default function OtherSection({
  keys,
  animeli,
}: {
  keys: string;
  animeli: animeType[];
}) {
  const showMoreBtn = useRef(null);
  const [height, setheight] = useState("18rem");
  const location = usePathname();

  let name = location.split("/");
  let currgen;

  useEffect(() => {
    function getMediaQuery() {
      if (window.matchMedia("(max-width: 450px)").matches) return "12rem";
      else if (window.matchMedia("(max-width: 600px)").matches) return "15rem";
      else return "18rem";
    }
    
    setheight(() => getMediaQuery());
  }, []);

 
  if (name[1] === "genre") {
    name[1] = location.slice(1);
    currgen = name[1].split("/")[1];
  }

  const handleShowmore = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let moreBtn = e.currentTarget;
    moreBtn.style.transform === "rotate(0deg)"
      ? (moreBtn.style.transform = "rotate(-180deg)")
      : (moreBtn.style.transform = "rotate(0deg)");
    let clist = e.currentTarget.parentElement?.nextElementSibling?.children[0] as HTMLElement;
    if (name[1].split("/")[0] == "genre" || name[1] === "search") {
      clist.style.height = "auto";
      clist.style.overflow = " ";
    } else {
      clist.style.maxHeight == "fit-content"
        ? (clist.style.maxHeight = height)
        : (clist.style.maxHeight = "fit-content");
      clist.style.overflow == " "
        ? (clist.style.overflow = "hidden")
        : (clist.style.overflow = " ");
    }
  };

  const Homeheading = (heading: string) => {
    let regex = /[A-Z]/;
    let indexOfCaptialLetter = heading.match(regex)?.index;
    let newheading =
      heading.slice(0, 1).toUpperCase() +
      heading.slice(1, indexOfCaptialLetter) +
      " " +
      heading.slice(indexOfCaptialLetter);
    return newheading;
  };

  

  return (
      <section  aria-label={`Section ${Homeheading(keys)} `} >
        <header className="CName">
          <h2>{Homeheading(keys)}</h2>

          {animeli.length > 10 && (
            <i
              id="showmore"
              role="button"
              style={{ transform: "rotate(0deg)" }}
              className="fa-solid fa-arrow-down"
              ref={showMoreBtn}
              onClick={(e) => handleShowmore(e)}
              aria-label="Showmore Button"
            ></i>
          )}
        </header>

        <section aria-label={`${Homeheading(keys)}`} className="Result">
          <List anime={animeli}  />
        </section>
      </section>
  );
}
