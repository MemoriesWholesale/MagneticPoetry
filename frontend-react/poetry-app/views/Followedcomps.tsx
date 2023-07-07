import User from "../src/types/user"
import CompositionList from "../src/types/compositionlist"
import { getCompositions } from "../src/lib/apiwrapper"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import Followbutton from "../components/followbutton"
import Poemframe from "../components/poemframe"

type Props = {currentUser:User|null,
            selectAuthor:(username:string)=>void}

export default function Followedcomps({currentUser,selectAuthor}: Props) {
    const [comps,setComps] = useState<CompositionList["compositions"]>([])
    useEffect(()=>{
    const fetchData = async () =>{
      const resp = await getCompositions(currentUser!.token!)
      if(resp.data){
        setComps(Object.values(resp.data)[0])
      }
    }
    fetchData();
},[comps])
return (
<>
<div>
  {comps.map((c)=><div key={c.id}><br></br>
  <Poemframe text={c.text}/>
  <br></br>
  by:&nbsp;<Link to='/usercomps' onClick={(_)=>selectAuthor(c.author!)}>{c.author}</Link>&nbsp;
  on{c.timestamp}&nbsp;
  <Followbutton is_following={true} username={c.author!} currentUser={currentUser!}></Followbutton></div>)}
</div>
</>
  )
}