
import List from "./List";

export default function ListLayout({Animes,heading}:{Animes:animeType[]|undefined,heading:string}) {
    console.log(Animes)
    return (
        <>
            <div className="Search-container">

                <div className='CName'>
                    <h2>{heading.slice(0, 1).toUpperCase() + heading.slice(1)}</h2>
                </div>

                <div className='Result'>
                    {Animes&& <List anime={Animes}  height="57rem" />}
                </div>

            </div>

        </>
    )
}