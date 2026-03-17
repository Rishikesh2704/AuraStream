"use client";
import { useEffect, useState } from "react";
import { useAnimestreamQuery } from "@/Redux/Fetchslice";
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

type propsType = {
  id: string | string[] | undefined;
  epid: string | null;
  currserv: serverType;
};

export default function VideoPlayer(props: propsType) {
  const { id, epid, currserv } = props;
  const [url, seturl] = useState<string | undefined>();
  const [Loading, setLoading] = useState(true);
  const [subtitlesrc, setsubtitlesrc] = useState<string | undefined>("");

  const { data: eplink } = useAnimestreamQuery<streamType>({
    animeid: id as string,
    epid: epid as string,
    server: currserv.serverName,
    type: currserv.type,
  });

  useEffect(() => {
    if (eplink?.streamingLink) {
      const { link, tracks } = eplink.streamingLink;

      let subtitle = tracks?.find((track: any) => track.label === "English");
      seturl(link?.file);
      setsubtitlesrc(subtitle?.file);
      setLoading(false);
    }
    return () => {
        seturl("")
    }
  }, [epid, id, eplink, currserv.serverName, currserv.type]);

  if (Loading) {
    <div>
      <h3>Loading...</h3>
    </div>;
  }

  
  return (
    <>
      {!Loading && url && (
        <>
        {console.log(url)}
          <MediaPlayer
            className="player"
            src={url}
            
          >
           <MediaProvider/>

            <PlyrLayout icons={plyrLayoutIcons} />
          </MediaPlayer>
        </>
      )}
    </>
  );
}
