'use client'
import { useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import List from "@/app/Components/List";
import { usePathname } from "next/navigation";


export default function OtherSection({ keys, animeli }:{keys:string,animeli:animeType[]}) {
    const showMoreBtn = useRef(null);
    const [height, setheight] = useState(()=> getMediaQuery())
    const [showmore, setshowmore] = useState("hidden")
    const location = usePathname()

    let name = location.split("/")
    let currgen

    function getMediaQuery ()  {
        if(window.matchMedia("(max-width: 600px)").matches) return "14rem"
        else if(window.matchMedia("(max-width: 400px)").matches) return "9rem"
        else return "18rem"
    }

    if (name[1] === "genre") {
        name[1] = location.slice(1)
        currgen = name[1].split('/')[1]
    }

    const handleShowmore = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {                  // HomePage Show More
        let moreBtn = e.currentTarget 
        moreBtn.style.transform === "rotate(0deg)" ? moreBtn.style.transform = "rotate(-180deg)" : moreBtn.style.transform = "rotate(0deg)"
        let clist = e.currentTarget.parentElement?.nextElementSibling?.children[0]  as HTMLElement
        if (name[1].split('/')[0] == "genre" || name[1] === "search") {
            clist.style.height = "auto"
            clist.style.overflow = " "
        }
        else {
            clist.style.maxHeight == "fit-content" ? clist.style.maxHeight = getMediaQuery() : clist.style.maxHeight = "fit-content"
            clist.style.overflow == " " ? clist.style.overflow = "hidden" : clist.style.overflow = " "
        }
    }
 
    const Homeheading = (heading:string) => {             
        let regex = /[A-Z]/
        let indexOfCaptialLetter = heading.match(regex)?.index
        let newheading = heading.slice(0, 1).toUpperCase() + heading.slice(1, indexOfCaptialLetter) + " " + heading.slice(indexOfCaptialLetter)
       return newheading
    }

    return (
        <>
            <div >
                <div className='CName' >
                    <h2>{(Homeheading(keys))}</h2>

                    {animeli.length > 10 && <i id="showmore" style={{ transform: "rotate(0deg)" }} className="fa-solid fa-arrow-down" ref={showMoreBtn} onClick={(e) => handleShowmore(e)}></i>}
                </div>

                <div className='Result'>
                    <List anime={animeli} next={showmore} height={height} />
                </div>
            </div>
        </>
    )
}