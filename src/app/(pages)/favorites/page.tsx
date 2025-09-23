import Modal from "@/app/Components/Modal/Modal"
import AnimeCard from "@/app/Components/AnimeCard"
import { useAppSelector } from "@/Redux/hooks"
import { auth } from "@/config/Firebase"


export default function FavoritePage(){
    const{ infoid, modalState } = useAppSelector((state) => state.states)
    let  favorites = JSON.parse(localStorage.getItem(auth.currentUser?.uid as string) as string)
    console.log(favorites)
    type favoriteAnimetype = {
       animeid:string,
       name:string,
       poster:string,

    }

   
    return(
        <>
         
            <div className="favorite-container" >

                <div className='CName'>
                    <h2>Favorites</h2>
                </div>

                <div className='Result'>
                        <div className="Anime-List">

                         {favorites?.map((anime:favoriteAnimetype) => {
                             return(
                                 <AnimeCard key={anime.animeid} name={anime.name} img={anime.poster} id={anime.animeid} />
                             )
                            })
                          }
                        </div>
                </div>
            </div>
                {modalState &&<Modal id={infoid}/>}
        </>
    )
}