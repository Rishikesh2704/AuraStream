'use client'
import React, { useEffect, useRef, useState } from "react";
import { useHomeQuery, useSearchSuggestionsQuery } from "@/Redux/Fetchslice";
import { setauthModalState, setKeyword } from "@/Redux/StateSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import SearchSuggestion from "./SearchSuggestion";
import { auth } from "@/config/Firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


export default function Navbar() {
    const [searchkey, setsearchkey] = useState('')
    const [genres, setgenres] = useState<any>([])
    const [User,setUser] = useState<User|null>(auth.currentUser)
    const [show, setshow] = useState<"hidden" | "visible" | undefined>("hidden")
    const { keyword } = useAppSelector((state) => state.states);
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    
    const pathname = usePathname()
    const navigate = useRouter();

    let path = pathname.split("/")[1]

    const { data: ReduxHome, isLoading: Reduxloading, error } = useHomeQuery({
        pollingInterval: 60 * 60000,
        skipPollingIfUnfocused: true
    });

    const {data:searchsuggestions} = useSearchSuggestionsQuery(inputRef.current?.value ?? skipToken) 
    useEffect(() => {
        if (!Reduxloading) {
            Object.entries(ReduxHome).map((categ) => {
                if (categ[0] === "genres") {
                    setgenres(categ[1])
                }
            })
        }

    }, [keyword, Reduxloading])
    
    useEffect(() => {
       const AuthState =  onAuthStateChanged(auth,(user) => {
            setUser(user)
        })

        return () => AuthState()
    } , [])
   

     const handlechange = (e:React.ChangeEvent<HTMLInputElement>) => { 
        setsearchkey(e.target.value) 
    }

    const handledropdown = () => { setshow("visible") }


    const fetchresult = async () => {
        if (keyword !== " ") {
            dispatch(setKeyword(searchkey))
            navigate.push('/search')
        }
    }

    const handleSignOut = async() => {
        await signOut(auth)
        alert("Logged Out")
    }

   

    return(
        <>
            <div className="navbar" style={{ position: (path === "" ? "absolute" : "fixed"), backgroundColor: (path === "" ? "linear-gradient(0deg, rgb(21, 20, 20) 0% , rgba(68, 68, 68, 0) 40%)" : "rgb(14,14,14)"), top: (path === "" ? "0.8rem" : "0rem") }}>

                <div className="Options">

                    <h1 className="Main-name">AuraStream</h1>

                    <ul>
                        <li id="category-main">
                            <Link href="/" id="category" prefetch>Home</Link>
                        </li>

                        <li onMouseOver={() => { handledropdown() }} onMouseOut={() => { setshow("hidden") }}>
                            <div className="dropdown" >
                                <a className="gen-tag"  >Genre</a>
                                <div className="options" style={{visibility: show}}>
                                    <ul id="hidden">
                                        {genres ? genres.map((genre:string, index:number) => (
                                            <li className="anime-genre" value={`/genre/${genre}`} key={index} onClick={() => handledropdown()}><Link className="genre-categories" href={`/genre/${genre}`} >{genre}</Link></li>

                                        )) : <p>NO Genres</p>}

                                    </ul>
                                </div>
                            </div>
                        </li>

                        {auth.currentUser&&<li id="category-main">
                            <Link href="/Favorites" id="category" >Favorites</Link>
                        </li>}
                    </ul>

                </div>  

                <div className="Other">
                    <div className="search">
                        <button className="search-bt" onClick={fetchresult} aria-label="Search Button"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input className="search-input"type="text" ref={inputRef}placeholder="Search" onChange={(e) =>handlechange(e)} value={searchkey}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    fetchresult()
                                }
                            }
                            }></input>
                    </div>
                     {searchsuggestions
                      && searchsuggestions?.length > 0
                      && <SearchSuggestion searchSuggestionsAnimes={searchsuggestions}/>}
                </div>

                <div className="AuthWrapper">
                       {!User&&<button className="SignInBtn" onClick={()=>dispatch(setauthModalState(true))}>Sign In</button> }
                       {User&&<button className="SignInBtn" onClick={handleSignOut}>Log Out</button>}

                </div>

            </div>

            
        </>
    )
    
}



