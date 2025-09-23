'use client'
import { useEffect, useRef, useState } from "react"
import Link from "next/link";
import { useHomeQuery } from "../../Redux/Fetchslice";
import { useAppSelector } from "../../Redux/hooks";



export default function Menu() {
    const [genres, setgenres] = useState<string[]>()
    const [show, setshow] = useState("visible")
    const { keyword } = useAppSelector((state) => state.states);
    const menuRef = useRef<HTMLDivElement>(null)

    const { data: ReduxHome, isLoading: Reduxloading, error } = useHomeQuery({
        pollingInterval: 60 * 60000,
        skipPollingIfUnfocused: true
    });


    useEffect(() => {
      
        if (!Reduxloading) {
            Object.entries(ReduxHome).map(([key,value] ) => {
                if (key === "genres") {
                    setgenres(value as string[])
                }
            })
        }
        
    }, [Reduxloading])

    const handleCloseMenu = () => {
        let body = document.getElementsByTagName('body')[0]

        menuRef.current?.style.setProperty("--menu", "-80vw")
        menuRef.current?.style.setProperty("--hideMenu", "hidden")
        body.style.setProperty('--homescroll', 'scroll')

    }



    return (
        <div className="Menu" ref={menuRef}>
            <button id="closeMenuBtn" onClick={() => handleCloseMenu()}><i className="fa-solid fa-x"></i> </button>
            <ul>
                <li id="category-main" onClick={() => handleCloseMenu()}>
                    <Link href="/Home" id="category"><i className="fa-solid fa-house"></i></Link>
                </li>

                <li id="category-main" onClick={() => handleCloseMenu()}>
                    <Link href="/Favorites" id="category" ><i className="fa-solid fa-star"></i></Link>
                </li>

                <li id="genresList">
                            <ul id="hidden">
                                {genres ? genres.map((genre:string, index:number) => (
                                    <li className="anime-genre" value={`/genre/${genre}`} key={index} onClick={() => handleCloseMenu()}><Link className="genre-categories" href={`/genre/${genre}`} >{genre}</Link></li>

                                )) : <p>NO Genres</p>}

                            </ul>

                </li>


            </ul>

        </div>
    )
}