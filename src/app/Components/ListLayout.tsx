
import List from "./List";

export default function ListLayout({Animes,heading}:{Animes:animeType[]|undefined,heading:string}) {
    return (
        <>
            <section className="Search-container">

                <header className='CName'>
                    <h2>{heading.slice(0, 1).toUpperCase() + heading.slice(1)}</h2>
                </header>

                <section className='Result'>
                    {Animes&& <List anime={Animes}  height="57rem" />}
                </section>

            </section>

        </>
    )
}