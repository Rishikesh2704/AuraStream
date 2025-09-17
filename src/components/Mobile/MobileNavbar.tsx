'use client'
import { useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { setKeyword } from "../../Redux/StateSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import  Menu  from "./Menu"

export default function MobileNavbar() {
    const [searchkey, setsearchkey] = useState('')
    const { keyword } = useAppSelector((state) => state.states);

   
    const dipatch = useAppDispatch()
    const searchInput = useRef(null)
    const searchCont = useRef(null)
    const searchBtn = useRef(null)

    // const location = useLocation(); 
    // const navigate = useNavigate();

    let path = location.pathname.split("/")[1]

    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) => { setsearchkey(e.target.value)}

    const fetchresult = () => {
        if(keyword!=" "){
            dipatch(setKeyword(searchkey))
            // navigate('/Search')
        }
    }


    const handleMenu = () =>{
        let menu = document.getElementsByClassName('Menu')[0] as HTMLDivElement
        let body = document.getElementsByTagName('body')[0]

        menu.style.setProperty("--menu","0vw")
        menu.style.setProperty("--hideMenu","visible")
        body.style.setProperty('--homescroll', 'hidden')

    }
    
   



    return (
        <>
            <Menu />

            <div className="navbar" style={{ position: ((path === "Home" || path === "") ? "absolute" : "fixed"), backgroundColor: ((path === "Home" || path === "") ? "linear-gradient(0deg, rgb(21, 20, 20) 0% , rgba(68, 68, 68, 0) 40%)" : "rgb(14,14,14)"), top: ((path === "Home" || path === "") ? "0rem" : "0rem") }}>
              
                <button className="menuBtn" onClick={()=>handleMenu()} ><i className="fa-solid fa-bars"/></button>
                
                <h2 className="Main-name">AuraStream</h2>
                

                <div className="Other">
                    <div className="search" ref={searchCont}>
                        <button className="search-bt" ref={searchBtn} onClick={fetchresult}><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input className="search-input" ref={searchInput} placeholder="Search" onChange={handlechange}  value={searchkey}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    fetchresult()
                                }
                            }
                            }></input>
                    </div>
                </div>
            </div>
        </>
    )
}



