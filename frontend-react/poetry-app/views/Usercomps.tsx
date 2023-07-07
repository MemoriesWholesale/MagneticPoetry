import { useState,useEffect } from "react"
import { getUserCompositions } from "../src/lib/apiwrapper"
import CompositionList from "../src/types/compositionlist"
import User from "../src/types/user"
import Composition from "../src/types/composition"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import Poemframe from "../components/poemframe"
import { ButtonGroup } from "react-bootstrap"


type Props = {currentUser:User|null,
            username:string|null,
            selectComp:(composition:Composition)=>void
        }

export default function Usercomps({ currentUser,username,selectComp }: Props) {
    const [comps,setComps] = useState<CompositionList["compositions"]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async () =>{
          const resp = await getUserCompositions(username!,currentUser!.token!)
          if(resp.data){
            setComps(Object.values(resp.data)[0])
          }
        }
        fetchData();
    },[comps])
  return (
    <>
    <div>
      {
        currentUser?.username==username?
      comps.map((c)=>{
          return <div key={c.id}>
            <br></br>
            <Poemframe text={c.text}/>
            <p></p>
            on {c.timestamp}
            <p></p>
            <ButtonGroup>
              <Button className="btn-outline-dark" style={{backgroundColor:'white'}} onClick={(e) => { e.preventDefault(); selectComp(c); navigate('/editcomp') } }>Edit</Button>
              <Button className="btn-outline-danger" style={{backgroundColor:'white'}} onClick={(e) => { e.preventDefault(); selectComp(c); navigate('/deletecomp') } }>Delete</Button>
            </ButtonGroup>
            <p></p>
          </div>
      }
      ):
      comps.map((c)=><div key={c.id}>
        <br></br>
        <Poemframe text={c.text}/>
        <p></p>
        on {c.timestamp}
        </div>)}
    
    </div>
    </>
  )}