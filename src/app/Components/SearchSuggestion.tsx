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
        let modal = document.getElementsByClassName('Modal-contentbox')
        dispatch(setInfoid(id))
    }

    return (
        <>
            <div id="Suggestions">
                {searchSuggestionsAnimes.map((suggestedAnime: Partial<animeType>) => (
                    <div className="suggestedAnimes" key={suggestedAnime.id} onClick={() => showinfo(suggestedAnime.id)}>
                        <div className="suggestedAnimeImgWrapper">
                            <img src={suggestedAnime?.poster} loading="lazy" id="suggestedAnimeImg"></img>
                        </div>
                        <div className="suggestedAnimeInfo">
                            <h4 className="SuggestedanimecoverName" >{suggestedAnime.title}</h4>
                            <span id="top10EpisodeType">
                                <h5 id="top10Sub"><i className="fa-solid fa-closed-captioning"></i>{suggestedAnime.showType}</h5>
                                <h5 id="top10dub"><i className="fa-solid fa-microphone"></i>{suggestedAnime.duration}</h5>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

