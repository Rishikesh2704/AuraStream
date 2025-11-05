"use client";
import { useAppDispatch } from "@/Redux/hooks";
import { setInfoid, setModalState } from "../../Redux/StateSlice";

type propsType = {
  searchSuggestionsAnimes: Partial<animeType>[];
};

export default function SearchSuggestion({
  searchSuggestionsAnimes,
}: propsType) {
  const dispatch = useAppDispatch();

  const showinfo = (id: string | undefined) => {
    dispatch(setModalState(true));
    dispatch(setInfoid(id));
  };
  return (
    <section className="Suggestions toggle" aria-label="Search Suggestions">
      {searchSuggestionsAnimes.map((suggestedAnime: Partial<animeType>) => (
        <button
          className="suggestedAnimes"
          onMouseDown={() => showinfo(suggestedAnime.id)}
          aria-label={`Open info for ${suggestedAnime.title}`}
          key={suggestedAnime.id}
        >
          <figure className="suggestedAnimeImgWrapper">
            <img
              src={suggestedAnime?.poster}
              loading="lazy"
              id="suggestedAnimeImg"
              alt={`${suggestedAnime.title} poster`}
            ></img>
          </figure>
          <div className="suggestedAnimeInfo">
            <h4 className="SuggestedanimecoverName">
              {suggestedAnime.title && suggestedAnime.title?.length >= 25
                ? suggestedAnime.title.slice(0, 30) + "..."
                : suggestedAnime.title}
            </h4>
            <span id="SuggestionEpisodeType">
              <span id="SuggestionSub">
                <i className="fa-solid fa-tv" aria-hidden={true}></i>
                {suggestedAnime.showType}
              </span>
              <span id="SuggestionDub">
                <i className="fa-solid fa-clock" aria-hidden={true}></i>
                {suggestedAnime.duration}
              </span>
            </span>
          </div>
        </button>
      ))}
    </section>
  );
}
