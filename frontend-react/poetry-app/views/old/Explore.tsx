import React from "react"

import { useState,useEffect } from "react"
import { explore } from "../../src/lib/apiwrapper"
import PoemList from "../../src/types/poemlist"
import User from "../../src/types/user"
import { Link } from "react-router-dom"
import Followbutton from "../../components/followbutton"


type Props = {currentUser:User|null,
            selectAuthor:(username:string)=>void}

export default function Userpoems({ currentUser,selectAuthor }: Props) {
    const [poems,setPoems] = useState<PoemList["poems"]>([])
    useEffect(()=>{
        const fetchData = async () =>{
          const resp = await explore(currentUser?.user_id)
          if(resp.data){
            setPoems(Object.values(resp.data)[0])
          }
        }
        fetchData();
    },[])


  return (
    <>
    <ul>
      {poems.map((p)=><li key={p.id}><strong>{p.title}</strong><br></br>&nbsp;{p.poem} &nbsp;
      <br></br>by:&nbsp;
      <Link to='/userpoems' onClick={(_)=>selectAuthor(p.author!)}>{p.author}
      </Link>
      {p.author!=currentUser?.username?
      <Followbutton is_following={p.is_following!} username={p.author!} currentUser={currentUser!}></Followbutton>
        :
        <></>}   
      </li>)}
    </ul>
    </>
  )
}