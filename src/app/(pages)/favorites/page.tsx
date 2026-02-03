"use client";
import Modal from "@/app/Components/Modal/Modal";
import AnimeCard from "@/app/Components/AnimeCard";
import { useAppSelector } from "@/Redux/hooks";
import { auth } from "@/config/Firebase";
import { useEffect, useState } from "react";
import AuhtUI from "@/app/Authentication/AuthUI";

export default function FavoritePage() {
  const { infoid, modalState, authModalState } = useAppSelector((state) => state.states);
  const [favorites, setFavorites] = useState<favoriteAnimetype[]>([]);

  useEffect(() => {
    if (typeof window !== undefined && auth.currentUser) {
      const stored = JSON.parse(
        localStorage.getItem(auth.currentUser.uid) as string
      );
      if (stored) {
        setFavorites(stored);
      }
    }
  }, [auth.currentUser?.uid]);

  type favoriteAnimetype = {
    animeid: string;
    name: string;
    poster: string;
  };

  return (
    <main className="favorite-container">
      <header className="CName">
        <h2 id="favorite-heading">Favorites</h2>
      </header>

      <section className="Result" aria-labelledby="favorite-heading">
        <article className="Anime-List">
          {favorites?.map((anime: favoriteAnimetype) => {
            return (
              <AnimeCard
                key={anime.animeid}
                name={anime.name}
                img={anime.poster}
                id={anime.animeid}
              />
            );
          })}
          {favorites.length === 0 && <p>You have no favorites yet.</p>}

        </article>
      </section>
      {modalState && <Modal id={infoid} />}
      {authModalState && <AuhtUI />}
      
    </main>
  );
}
