import User from "../../src/types/user"
import PoemList from "../../src/types/poemlist"
import { getPoems } from "../../src/lib/apiwrapper"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Followbutton from "../../components/followbutton"

type Props = {currentUser:User|null,
            selectAuthor:(username:string)=>void}

export default function Followedpoems({currentUser,selectAuthor}: Props) {
    const [poems,setPoems] = useState<PoemList["poems"]>([])
    useEffect(()=>{
    const fetchData = async () =>{
      const resp = await getPoems(currentUser!.token!)
      if(resp.data){
        setPoems(Object.values(resp.data)[0])
      }
    }
    fetchData();
},[poems])
return (
<>
<ul>
  {poems.map((p)=><li key={p.id}><b>{p.title}</b><br></br>&nbsp;{p.poem}
  <br></br>
  by:&nbsp;<Link to='/userpoems' onClick={(_)=>selectAuthor(p.author!)}>{p.author}</Link>
  <Followbutton is_following={true} username={p.author!} currentUser={currentUser!}></Followbutton></li>)}
</ul>
</>
  )
}