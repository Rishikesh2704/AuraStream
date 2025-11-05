import Image from "next/image";
import Navbar from "./Components/Navbar";

export default function loading() {
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-black flex flex-col items-center justify-center">
        <Navbar />
        <section className="Spotlight_Skeleton">
          <div className="SpotlightInfo_Wrapper">
            <div className="SpotlightPoster_Wrapper">
              <div id="SpotlightPoster_Skeleton"> </div>
              <div id="SpotlightPoster_Title"> </div>
            </div>
              <div className="SpotlightDescriptionline">
                <div id="line1"> </div>
                <div id="line2"> </div>
                <div id="line3"> </div>
              </div>
          </div>
        </section>
      </div>
    </>
  );
}
