
interface animeType{
   id:string,
   number:string,
   poster:string,
   title:string,
   showType:string,
   duration:string;
   [key:string] :string
}

interface spotlightAnimeTypes extends animeType {
  description:string,
  tvInfo: {
    duration :string,
    episodeInfo: { sub: string, dub: string },
    quality :string,
    releaseDate:string,
    showType:string,
  }
} 

interface seasonAnimeType extends animeType{
  season_poster:string,
  season:number,
}

interface animeInfo extends animeType {
  Overview:string,
  Genres:Array<string>,
  Status:string,
  title:string,
  tvInfo:{
    dub:string;
    duration:string;
    quality:string;
    rating:string;
    showType:string;
    sub:string;
  }
}

interface InfoTypes  {
  data:{ 
    animeInfo:animeInfo;
    poster:string;
    title:string;
    [key:string]:string
  }
  seasons:seasonAnimeType[]
}

type episodeType = {
  id:string,
  episode_no:number;
  filler:boolean;
  title:string;
  episodeId:string;
}

type episodeList = {
  episodes?:episodeType[] ,
  totalEpisodes:number,
}

type serverType ={
  serverName:string;
  type:string;
}

type favAnimeType = {
  name: string|undefined;
  poster: string|undefined;
  animeid: string|undefined;
}

type linkType = {
  file:string
}
type tracksType = {
  label:string;
  file:string;
}

type streamType = {
  data:{
    streamingLink:{
     link:linkType;
     tracks:tracksType[]
    }
    servers:serverType[]
  }
}

type pagesType = {
  data:animeInfo[];
  totalPage:number;
}

