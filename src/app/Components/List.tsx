// import { useLocation } from 'react-router-dom'
import AnimeCard from './AnimeCard';

type propsType = {
   anime:animeType[];
   next?:string;
   height:string;
}

export default function List(props:propsType) {
   const { anime, next, height } = props
   // const location = useLocation();
 
   let name = location.pathname.split("/")
   // let currgen
   if(name[1]==='genre'||name[1]!=='Home'){
      //  name[1] = location.pathname.slice(1)  
      //  currgen = name[1].split('/')[1]
   } 


  
   return (
      <>
         <div className="Anime-List" style={
            {
               overflow:next ,
               maxHeight:(name[1]==="Home"||name[1]==="")?height:" ",
               rowGap:(name[1]!=="Home"||name[1]!==undefined)?"2.2rem":" "
            }
         }>
            { anime&&anime?.map((ani) => (
                <AnimeCard key={ani.id} name={ani?.title}  img={ani?.poster} id={ani?.id} />
            ))}
            
         </div>
      </>
   )
}
