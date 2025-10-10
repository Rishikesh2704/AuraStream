"use client";
import { useEffect, useState } from "react";
import { useAnimeserversQuery } from "@/Redux/Fetchslice";

type propsType = {
  currserv: serverType;
  setcurrserv: (server: serverType) => void;
  currep?: episodeType | undefined;
  epid: string | null;
  id: string | string[] | undefined;
};

export default function Servers(props: propsType) {
  const { currserv, currep, epid, id, setcurrserv } = props;
  const [serverli, setserverli] = useState<serverType[] | undefined>();

  const {
    data: serverlist,
    isLoading: servloading,
    error: servError,
  } = useAnimeserversQuery({ animeid: id as string, epid: epid as string });

  useEffect(() => {
    if (!servloading) {
      setserverli(serverlist);
    }
    return () => {
      setserverli(undefined);
    };
  }, [epid, id, serverlist]);

  const changeServer = (
    newserver: string,
    type: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let disabled = document.getElementsByClassName("btndisable");
    if (disabled.length !== 0) {
      disabled[0].classList.remove("btndisable");
    }

    let select = e.currentTarget;
    select.classList.add("btndisable");
    setcurrserv({ serverName: newserver, type: type });
  };

  return (
    <>
      <article className="Other-src" aria-label="Other-sources">

        {currep !== null && (
          <header id="currep">
            <h4>{`Episode ${currep?.episode_no}`}</h4>
          </header>
        )}

        <section className="Sub" aria-labelledby="sub-servers-heading">

          <h4 id="sub-servers-heading">Sub :</h4>

          {serverli &&
            serverli.map((epsrc: serverType, indx) => {
              if (epsrc.type === "sub") {
                return (
                  <button
                    key={indx}
                    className={`sub-ep ${
                      currserv.serverName === epsrc.serverName &&
                      currserv.type == "sub"
                        ? "btndisable"
                        : ""
                    }`}
                    onClick={(e) => changeServer(epsrc.serverName, "sub", e)}
                  >
                    {epsrc.serverName}
                  </button>
                );
              }
            })}
        </section>

        <hr></hr>

        <section className="Dub" aria-labelledby="dub-servers-heading">

          <h4 id="dub-servers-heading">Dub :</h4>

          {serverli &&
            serverli.map((epsrc, indx) => {
              if (epsrc.type === "dub") {
                return (
                  <button
                    key={indx}
                    className={`dub-ep  ${
                      currserv.serverName === epsrc.serverName &&
                      currserv.type == "dub"
                        ? "btndisable"
                        : ""
                    }`}
                    onClick={(e) => changeServer(epsrc.serverName, "dub", e)}
                  >
                    {epsrc.serverName}
                  </button>
                );
              }
            })}
        </section>

      </article>
    </>
  );
}
