'use client'
import { useAppDispatch } from "@/Redux/hooks"
import { setInfoid, setModalState } from "@/Redux/StateSlice"

type propsType ={
    searchSuggestionsAnimes:Partial<animeType>[]
}

export default function SearchSuggestion({searchSuggestionsAnimes}:propsType) {
    const dispatch = useAppDispatch()

    const showinfo = (id:string|undefined) => {
        dispatch(setModalState(true))
        // let modal = document.getElementsByClassName('Modal-contentbox')
        dispatch(setInfoid(id))
    }
     console.log(searchSuggestionsAnimes)
    return (
            <section className="Suggestions toggle" aria-label="Search Suggestions">
                {searchSuggestionsAnimes.map((suggestedAnime: Partial<animeType>) => (
                    <button className="suggestedAnimes" aria-label={`Open info for ${suggestedAnime.title}`} key={suggestedAnime.id} onClick={() => showinfo(suggestedAnime.id)}>
                        <figure className="suggestedAnimeImgWrapper">
                            <img src={suggestedAnime?.poster} loading="lazy" id="suggestedAnimeImg" alt={`${suggestedAnime.title} poster`}></img>
                        </figure>
                        <div className="suggestedAnimeInfo">
                            <h4 className="SuggestedanimecoverName" >{suggestedAnime.title}</h4>
                            <span id="top10EpisodeType">
                                <span id="top10Sub"><i className="fa-solid fa-closed-captioning" aria-hidden={true}></i>{suggestedAnime.showType}</span>
                                <span id="top10dub"><i className="fa-solid fa-microphone" aria-hidden={true}></i>{suggestedAnime.duration}</span>
                            </span>
                        </div>
                    </button>
                ))}
            </section>
    )
}

