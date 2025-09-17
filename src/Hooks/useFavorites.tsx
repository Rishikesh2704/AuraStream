import { useEffect, useState } from "react";

function useFavorites(userId:string) {
  const [favorites, setfavorites] = useState<favAnimeType[] > (() => {
    if(userId){
      let stored = localStorage.getItem(userId) 
        return stored ? JSON.parse(stored) : []
   
    }
    return []
  })
 
  useEffect(() => {
    if(userId&&favorites){
      localStorage.setItem(userId, JSON.stringify(favorites))
    }
  }, [favorites,userId])

  const addFavorite = (animeObj:favAnimeType) => {
    if(favorites.find((favAnime) => favAnime.animeid === animeObj.animeid)) {alert("AlreadyExist In The Favorites") }
    else{setfavorites((fav:favAnimeType[] ) => [...fav, animeObj])}
  }

  const deleteFavorite = (id:string|undefined) => {
    setfavorites((fav:favAnimeType[] ) => fav.filter((notFav) => notFav.animeid !== id))
  }

  const isFavorite = (animeId:string) => {
    if(favorites.find((favAnime) => favAnime.animeid === animeId)) return true
    else return false
   
  }

  return { addFavorite, deleteFavorite, favorites, isFavorite }
}

export default useFavorites




// let storedFavorite = JSON.parse(localStorage.getItem("Favorites")) || []
// if(storedFavorite===null){  storedFavorite = storedFavorite.push(favAnimeObj) }
// else{storedFavorite.push(favAnimeObj)}
// localStorage.setItem("Favorites",JSON.stringify(storedFavorite))
// console.log(JSON.parse(localStorage.getItem("Favorites")))

// let storedFavorite = JSON.parse(localStorage.getItem("Favorites")) || []
// let filteredFav = storedFavorite.filter((notFav)=> notFav.animeid !== id)
// localStorage.setItem("Favorites",JSON.stringify(filteredFav))