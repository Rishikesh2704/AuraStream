import { useEffect, useRef } from 'react'
// import { useLocation } from 'react-router-dom'
import { setInfoid, setModalState } from '../../Redux/StateSlice'
import { useAppDispatch } from '../../Redux/hooks'
import Image from 'next/image';

type propsType = {
    name:string;
    img:string;
    id:string;
    loading?:boolean;
    eps?:number;
}

export default function AnimeCard(props:propsType) {
    const { name, img, id, loading, eps } = props

    const element = useRef<HTMLDivElement>(null)
    // const location = useLocation();
    const dispatch = useAppDispatch()

    const page = location.pathname.split('/')
    const showinfo = () => {
        // setmodalstate(true)
        dispatch(setModalState(true))
        dispatch(setInfoid(id))
    }

    const handleMouseOverElement = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement
        let img = target.className === "img" ? target : target.parentNode?.parentNode?.children[0] as HTMLDivElement
        let animeimg = img?.querySelector('img') as HTMLImageElement

        e.currentTarget.style.transition = "0.3s ease-out"
        animeimg.style.transition = "0.3s ease-out"
        animeimg.style.transform = "scale(1.14)"
        img.style.setProperty('--heightofcover', "15.24rem")
        img.style.setProperty('--widthofcover', "10rem")
        img.style.setProperty('--transformcover', "1.1")
        img.style.setProperty('--tanslateX', "-0.54rem")
        img.style.setProperty('--tanslateY', "-0rem")
        e.currentTarget.style.bottom = "1rem"
    }


    useEffect(() => {
        let elementC = element.current as HTMLDivElement

        if (elementC && (page[1] === "genre" || page[1] === "search")) {

            if (elementC?.getBoundingClientRect().bottom >= 0 && elementC?.getBoundingClientRect().bottom <= window.innerHeight + elementC?.getBoundingClientRect().width) {
                elementC.style.setProperty("--size", "scale(1)")
            }
            window.addEventListener("scroll", () => {
                if (elementC?.getBoundingClientRect().bottom >= 0 && elementC?.getBoundingClientRect().bottom <= window.innerHeight + elementC?.getBoundingClientRect().width) {
                    elementC.style.setProperty("--size", "scale(1)")
                }
            })
        }
        else {
            elementC.style.setProperty("--size", "scale(1)")

        }

        return () => {
            window.removeEventListener("scroll", () => {

                if (elementC?.getBoundingClientRect().bottom >= 0 && elementC?.getBoundingClientRect().bottom <= window.innerHeight + elementC?.getBoundingClientRect().width) {
                    elementC.style.transform = "scale(1)"

                }
            })
        }
    },)


    useEffect(() => {

        let animeContainer = document.querySelectorAll('.element-container') as NodeListOf<HTMLElement>
        animeContainer.forEach((element) => {
            element.style.setProperty("--loading", loading?"visible":"hidden")
        });

    }, [loading])


    const handleMouseOutElement = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement
        let img = target.className === "img" ? target: target.parentNode?.parentNode?.children[0] as HTMLDivElement
        let animeimg = img?.querySelector("img") as HTMLImageElement
        
        animeimg.style.transition = "0.4s ease-out"
        animeimg.style.transform = "scale(1)"
        e.currentTarget.style.bottom = "0rem"
        img.style.setProperty('--heightofcover', "15.34rem")
        img.style.setProperty('--widthofcover', "10rem")
        img.style.setProperty('--transformcover', '1')
        img.style.setProperty('--tanslateX', "0rem")
        img.style.setProperty('--tanslateY', "0rem")
    }


    return (
        <>
            <div className="element-container" onClick={showinfo} ref={element} onMouseOver={(e) => handleMouseOverElement(e)} onMouseOut={(e) => handleMouseOutElement(e)} >
                <div className='img' >
                    <Image 
                        id="elementimg" 
                        height={400}
                        width={300}
                        loading='lazy' 
                        src={img || '/Bakugou.gif'}  
                        alt="anime-poster"
                        />
                </div>

                <div className="info" >
                    <h4 className="coverName">{name}</h4>
                    {eps && <p>Episode {eps}</p>}
                </div>
            </div>
        </>
    )
}