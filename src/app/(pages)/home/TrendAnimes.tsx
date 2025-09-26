import { memo, useRef } from 'react'
import { setInfoid, setModalState } from '@/Redux/StateSlice';
import { useAppDispatch } from '@/Redux/hooks';
import Image from 'next/image';


const TrendAnimes = memo((props:{animes:animeType[]}) => {
    const { animes } = props
    const dispatch = useAppDispatch()
    const element = useRef(null);
    const trendContent = useRef<HTMLDivElement>(null);
    const trendContainer = useRef<HTMLDivElement>(null);

    /*********************Functions **********************/

    const handleMouseOverElement = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {             // Hover Animation //
        let img = e.target as HTMLDivElement
        let animeimg = img.querySelector('img') as HTMLImageElement

        e.currentTarget.style.transition = "0.3s ease-out"

         if(animeimg){
             animeimg.style.transition = "0.3s ease-out"
             animeimg.style.transform = "scale(1.1)"
         }

        img.style.setProperty('--heightofcover', "23.1rem")
        img.style.setProperty('--widthofcover', "16.5rem")
        img.style.setProperty('--transformcover', "1.1")
        img.style.setProperty('--tanslateX', "-0.75rem")
        img.style.setProperty('--tanslateY', "-0.2rem")
        e.currentTarget.style.bottom = "1rem"
    }

    const handleMouseOutElement = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {             // Hover-out Animation //
        let img = e.target as HTMLDivElement
        let animeimg = img?.querySelector('img') as HTMLImageElement

        if(animeimg){
            animeimg.style.transition = "0.4s ease-out"
            animeimg.style.transform = "scale(1)"
        }
        
        e.currentTarget.style.bottom = "0rem"
        img.style.setProperty('--heightofcover', "21.8rem")
        img.style.setProperty('--widthofcover', "15rem")
        img.style.setProperty('--transformcover', '1')
        img.style.setProperty('--tanslateX', "0rem")
        img.style.setProperty('--tanslateY', "0rem")
    }

    const showinfo = (id:string) => {
        dispatch(setModalState(true))
        let modal = document.getElementsByClassName('Modal-contentbox')
        dispatch(setInfoid(id))
    }

    let slide = 0

    const handleNextSlide = () => {
        let trendcontainer = trendContent.current as HTMLDivElement
        slide += 25
        if (slide > 65) {
            slide = 65
        }
        trendcontainer.style.transform = `translateX(-${slide}%)`
    }

    const handlePrevSlide = () => {
        let trendcontainer = trendContent.current as HTMLDivElement
        slide -= 30
        if (slide < 10) {
            slide = 0
        }
        trendcontainer.style.transform = `translateX(-${slide}%)`
    }

    return (
        <>
            <div className='CName' >
                <h2 id="trendH2">Trending</h2>
            </div>

            <div className='trendingCategory' ref={trendContainer}>

                <div className="Trending-Main" >
                    <div className="PrevBtn" onClick={() => handlePrevSlide()}>
                        <i className="fa-solid fa-chevron-left" onClick={() => handlePrevSlide()}></i>
                    </div>
                    <div className='NextBtn' onClick={() => handleNextSlide()}>
                        <i className="fa-solid fa-chevron-right" onClick={() => handleNextSlide()}></i>
                    </div>
                    <div className="trendingContainer" ref={trendContent} >
                        {animes.map((anime:animeType) => {
                            return (
                                    <div 
                                        className="element-container" 
                                        key={anime.id} 
                                        data-label={anime.id} 
                                        onClick={() => showinfo(anime.id)} 
                                        ref={element} 
                                        onMouseOver={(e) => handleMouseOverElement(e)} 
                                        onMouseOut={(e) => handleMouseOutElement(e)} 
                                    >
                                        <div className='img'>
                                            <Image 
                                              id="elementimg" 
                                              src={anime.poster} 
                                              height={400}
                                              width={300}
                                              loading='lazy' 
                                              alt={anime.title} 
                                            />
                                        </div>

                                        <div className="info" >
                                            <h4 className="coverName">{anime.title}</h4>
                                        </div>

                                    </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    )
})

export default TrendAnimes
