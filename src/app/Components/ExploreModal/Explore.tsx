import { setExploreModalState } from "@/Redux/StateSlice";
import "./explore.css";
import { useDispatch } from "react-redux";
import { useHomeQuery } from "@/Redux/Fetchslice";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ExploreModal() {
  const [genres, setGenres] = useState<any>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const dispatch = useDispatch();
  const ModalRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const {
    data: Categories,
    isLoading,
    error,
  } = useHomeQuery({
    pollingInterval: 60 * 60000,
    skipPollingIfUnfocused: true,
  });

  useEffect(()=> {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    if (Categories) {
      const genres = Object.entries(Categories).find(
        ([key, _]) => key === "genres",
      );
      if (genres) setGenres(genres[1]);
    }

    return () =>{ document.getElementsByTagName('body')[0].style.overflow = ''}
  }, [isLoading]);

  const onSubmit = (
    e:
      | React.SubmitEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (searchKey !== "") {
      navigate.push(`/search/${searchKey}`);
      dispatch(setExploreModalState(false));
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error in fetching Genres</h2>;
  }
  return (
    <div
      className="Modal_Bg"
      onClick={(e) => {
        if (e.target === e.currentTarget ) {
          ModalRef.current && ModalRef.current.classList.add("CloseModal");
          setTimeout(() => {
            dispatch(setExploreModalState(false));
             ModalRef.current && ModalRef.current.classList.remove("CloseModal");
          }, 150);
        }
      }}
    >
      <article className="Modal_Container" ref={ModalRef}>
        <form
          className="Search_Wrapper"
          onSubmit={(e) => onSubmit(e)}
          onKeyDown={(e) => {
            if (e.key === "enter") onSubmit(e);
          }}
        >
          <label>Search</label>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit" aria-label="Search Button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <ul className="Genres_list">
          {genres.map((genre: string) => (
            <li
              key={genre + 1}
              className="Genre"
              onClick={() => dispatch(setExploreModalState(false))}
            >
              <Link href={`/genre/${genre}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
