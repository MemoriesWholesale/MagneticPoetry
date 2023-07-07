import { useState,useEffect } from "react"
import { getUserPoems } from "../../src/lib/apiwrapper"
import PoemList from "../../src/types/poemlist"
import User from "../../src/types/user"
import Poem from "../../src/types/poem"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"


type Props = {currentUser:User|null,
            username:string|null,
            selectPoem:(poem:Poem)=>void}

export default function Userpoems({ currentUser,username,selectPoem }: Props) {
    const [poems,setPoems] = useState<PoemList["poems"]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async () =>{
          const resp = await getUserPoems(username!,currentUser!.token!)
          if(resp.data){
            setPoems(Object.values(resp.data)[0])
          }
        }
        fetchData();
    },[poems])
  return (
    <>
    <div className="justify-content-center">
      {
        currentUser?.username==username?
      poems.map((p)=><li key={p.id}><b>{p.title}</b><br></br>&nbsp;{p.poem} &nbsp;
      <Button onClick={(e)=>{e.preventDefault();selectPoem(p);navigate('/editpoem')}}>Edit</Button>
      <Button onClick={(e)=>{e.preventDefault();selectPoem(p);navigate('/deletepoem')}}>Delete</Button>
      </li>
      ):
      poems.map((p)=><li key={p.id}><b>{p.title}</b><br></br>&nbsp;{p.poem}</li>)}
    
    </div>
    </>
  )}