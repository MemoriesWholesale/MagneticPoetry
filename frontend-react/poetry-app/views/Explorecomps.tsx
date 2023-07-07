import { useState,useEffect } from "react"
import { exploreCompositions } from "../src/lib/apiwrapper"
import CompositionList from "../src/types/compositionlist"
import User from "../src/types/user"
import { Link } from "react-router-dom"
import Followbutton from "../components/followbutton"
import Poemframe from "../components/poemframe"


type Props = {currentUser:User|null,
            selectAuthor:(username:string)=>void}

export default function Userpoems({ currentUser,selectAuthor }: Props) {
    const [comps,setComps] = useState<CompositionList["compositions"]>([])
    useEffect(()=>{
        const fetchData = async () =>{
          const resp = await exploreCompositions(currentUser?.user_id)
          if(resp.data){
            setComps(Object.values(resp.data)[0])
          }
        }
        fetchData();
    },[])


  return (
    <>
    <div>
      {comps.map((c)=><div key={c.id}>
        <br></br>
      <Poemframe text={c.text}/>
      <br></br>by:&nbsp;
      <Link to='/usercomps' style={{textDecoration:'none'}} onClick={(_)=>selectAuthor(c.author!)}>{c.author}
      </Link>
      &nbsp;
      on&nbsp;{c.timestamp}&nbsp;
      {c.author!=currentUser?.username?
      <Followbutton is_following={c.is_following!} username={c.author!} currentUser={currentUser!}></Followbutton>
        :
        <></>}   
      </div>)}
    </div>
    </>
  )
}