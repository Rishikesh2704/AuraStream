import { useState } from "react";
import Link from "next/link";
import { setModalState } from "../../../Redux/StateSlice";
import { useAppDispatch } from "../../../Redux/hooks";

export default function EpisodeList({
  eplist,
}: {
  eplist: episodeList | undefined;
}) {
  const { episodes } = eplist ?? {};
  const dispatch = useAppDispatch();
  const [rangeindex, setrangeindex] = useState<number>(0);
  const groupedep = (episodelist: episodeType[]) => {
    let epgroup = [];
    const range = 100;

    for (let i = 0; i < episodelist?.length; i += range) {
      epgroup.push(episodelist.slice(i, i + range));
    }
    return epgroup;
  };

  const changerange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedrange = e.target.value.split("-")[0];
    setrangeindex((+selectedrange - 1) / 100);
  };

  const groupep = groupedep(episodes ?? []);
  return (
    <>
      {episodes && (
        <section className="epli" aria-labelledby="Episodelist Heading">
          <header
            className="Episodetag-range"
            
          >
            <h2 id="Episodelist Heading">Episodes</h2>

            {episodes.length > 100 && (
              <select
                onChange={(e) => {
                  changerange(e);
                }}
                id="rangesselection"
                aria-label="Select episode range"
              >
                {groupep.map((_, index) => (
                  <option key={index}>
                    {index * 100 + 1} - {(index + 1) * 100}
                  </option>
                ))}
              </select>
            )}
          </header>

          <hr />

          <section className="Ep-list" aria-label="Episode-list">
            <div className="episodes">
              <div className="Ep-grid">
                {groupep[rangeindex]?.map((ep, index) => (
                  <p key={index}>
                    <Link
                      href={`/stream/${ep.id}`}
                      prefetch
                      id="epstream-ep"
                      onClick={() => dispatch(setModalState(false))}
                      aria-label={`watch episode ${ep.episode_no}`}
                    >
                      {ep.episode_no}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </section>
        </section>
      )}
    </>
  );
}
