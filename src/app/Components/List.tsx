'use client'
import { usePathname } from 'next/navigation';
import AnimeCard from './AnimeCard';

type propsType = {
   anime:animeType[];
   next?:string;
   height:string;
}

export default function List(props:propsType) {
   const { anime, next, height } = props
   const location = usePathname();
 
   let name = location.split("/")
   let currgen
   if(name[1]==='genre'||name[1]!==' '){
       name[1] = location.slice(1)  
       currgen = name[1].split('/')[1]
   } 


  
   return (
      <>
         <article className="Anime-List" style={
            {
               overflow:next ,
               maxHeight:(name[1]==="Home"||name[1]==="")?height:" ",
               rowGap:(name[1]!=="Home"||name[1]!==undefined)?"2.2rem":" "
            }
         }>
            { anime&&anime?.map((ani) => (
                <AnimeCard key={ani.id} name={ani?.title}  img={ani?.poster} id={ani?.id} />
            ))}
            
         </article>
      </>
   )
}
