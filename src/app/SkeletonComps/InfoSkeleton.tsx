import React from "react";

function InfoSkeleton() {
  return (
    <>
      <section className="Info_Skeleton_Container">
        <div id="Info_Skeleton_PosterBg" aria-hidden={true}>
        </div>

        <div className="Info_Skeleton_Poster"></div>

        <article className="Info">
          <div id="Info_Skeleton_Title"/>

          <section className="Watch-desc" aria-labelledby="Description-heading">
            <h2 id="Description-heading">Description</h2>

            <hr />
            <div className="Info_Desc-skeleton">
              <div id="line1"> </div>
              <div id="line2"> </div>
              <div id="line3"> </div>
            </div>
          </section>
        </article>
      </section>
    </>
  );
}

export default InfoSkeleton;
