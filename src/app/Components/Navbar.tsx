"use client";
import React, { useEffect, useRef, useState } from "react";
import { useHomeQuery, useSearchSuggestionsQuery } from "@/Redux/Fetchslice";
import { setauthModalState } from "@/Redux/StateSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import SearchSuggestion from "./SearchSuggestion";
import { auth } from "@/config/Firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useDebounce from "@/Hooks/useDebounce";

export default function Navbar() {
  const [searchkey, setsearchkey] = useState("");
  const [isFocused, setIsfocused] = useState(false);
  const [genres, setgenres] = useState<any>([]);
  const [User, setUser] = useState<User | null>(auth.currentUser);
  const [show, setshow] = useState<"hidden" | "visible" | undefined>("hidden");
  const { keyword } = useAppSelector((state) => state.states);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const navigate = useRouter();

  let path = pathname.split("/")[1];
  const {
    data: ReduxHome,
    isLoading: Reduxloading,
    error,
  } = useHomeQuery({
    pollingInterval: 60 * 60000,
    skipPollingIfUnfocused: true,
  });
  
  const debouncedValue = useDebounce(searchkey,200)
  const { data: searchsuggestions } = useSearchSuggestionsQuery(
    debouncedValue ?? skipToken
  );

  useEffect(() => {
    if (!Reduxloading) {
      Object.entries(ReduxHome).map((categ) => {
        if (categ[0] === "genres") {
          setgenres(categ[1]);
        }
      });
    }
  }, [keyword, Reduxloading]);

  useEffect(() => {
    const AuthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => AuthState();
  }, []);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchkey(e.target.value);
  };

  const handledropdown = () => {
    setshow("visible");
  };

  const fetchresult = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (searchkey !== " ") {
      navigate.push(`/search/${searchkey}`);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    alert("Logged Out");
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: path === "" ? "absolute" : "fixed",
          backgroundColor:
            path === ""
              ? "linear-gradient(0deg, rgb(21, 20, 20) 0% , rgba(68, 68, 68, 0) 40%)"
              : "rgb(14,14,14)",
          top: path === "" ? "0.8rem" : "0rem",
        }}
      >
        <section className="Options">
          <header aria-labelledby="SiteName">
            <h1 id="SiteName" className="Main-name">
              AuraStream
            </h1>
          </header>

          <ul aria-label="Categories">
            <li id="category-main">
              <Link href="/" id="category" prefetch>
                Home
              </Link>
            </li>

            <li
              onMouseOver={() => {
                handledropdown();
              }}
              onMouseOut={() => {
                setshow("hidden");
              }}
            >
              <div className="dropdown">
                <button
                  className="gen-tag"
                  aria-haspopup="true"
                  aria-expanded={show === "visible"}
                  aria-controls="genre-list"
                >
                  Genre
                </button>
                <div className="options" style={{ visibility: show }}>
                  <ul id="hidden">
                    {genres ? (
                      genres.map((genre: string, index: number) => (
                        <li
                          className="anime-genre"
                          value={`/genre/${genre}`}
                          key={index}
                          onClick={() => handledropdown()}
                        >
                          <Link
                            className="genre-categories"
                            href={`/genre/${genre}`}
                          >
                            {genre}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <p>NO Genres</p>
                    )}
                  </ul>
                </div>
              </div>
            </li>

            {auth.currentUser && (
              <li id="category-main">
                <Link href="/Favorites" id="category">
                  Favorites
                </Link>
              </li>
            )}
          </ul>
        </section>

        <section className="Other">
          <form
            className="search"
            role="search"
            aria-label="Search for anime"
            onSubmit={(e) => fetchresult(e)}
          >
            <button
              className="search-bt"
              aria-label="Search Button"
              type="submit"
            >
              <i
                className="fa-solid fa-magnifying-glass"
                aria-hidden={true}
              ></i>
            </button>
            <input
              className="search-input"
              name="search-input"
              type="text"
              ref={inputRef}
              placeholder="Search"
              onChange={(e) => handlechange(e)}
              value={searchkey}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchresult(e);
                }
              }}
              onFocus={() => {
                setIsfocused(true);
              }}
              onBlur={() => {
                setIsfocused(false);
              }}
            />
          </form>
          {isFocused && searchsuggestions && searchsuggestions?.length > 0 && (
            <SearchSuggestion searchSuggestionsAnimes={searchsuggestions} />
          )}
        </section>

        <section className="AuthWrapper">
          {!User && (
            <button
              className="SignInBtn"
              onClick={() => dispatch(setauthModalState(true))}
              aria-label="Sign In"
            >
              Sign In
            </button>
          )}
          {User && (
            <button
              className="SignInBtn"
              onClick={handleSignOut}
              aria-label="Sign Out"
            >
              Sign Out
            </button>
          )}
        </section>
      </nav>
    </>
  );
}
