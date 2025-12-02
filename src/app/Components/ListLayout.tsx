import Image from "next/image";
import List from "./List";

export default function ListLayout({
  Animes,
  heading,
  isLoading,
}: {
  Animes: animeType[] | undefined;
  heading: string;
  isLoading: boolean;
}) {
  const loadingImage = (
    <div className="h-[100vw] w-[100%] flex flex-col justify-center items-center">
      <Image src={"/kidzoro.png"} alt="loadingImage" height={150} width={150} />
      <h1>Loading...</h1>
    </div>
  );

 
  return (
    <>
      <section className="Search-container">
        <header className="CName">
          <h2 id="listHeading">
            {heading.slice(0, 1).toUpperCase() + heading.slice(1)}
          </h2>
        </header>
        {!isLoading ? (
          <section className="Result" aria-labelledby="listHeading">
            {Animes && <List anime={Animes} height="57rem" />}
            {!Animes && <h1>No results found</h1>}
          </section>
        ) : (
          loadingImage
        )}
      </section>
    </>
  );
}
