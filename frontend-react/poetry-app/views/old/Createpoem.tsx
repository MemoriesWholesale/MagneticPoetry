import { useState } from "react"
import { createPoem } from "../../src/lib/apiwrapper"
import Poem from "../../src/types/poem"
import User from "../../src/types/user"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import React from "react"


type Props = {currentUser:User|null,
            selectAuthor:(username:string)=>void}

export default function Createpoem({currentUser,selectAuthor}: Props) {
    const [newPoem,setNewPoem] = useState<Poem>({title:'',poem:''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setNewPoem({...newPoem,[e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault();
      const resp = await createPoem(newPoem,currentUser?.token!)
      if (resp.error){
        console.log('error')
      }else{
        console.log(`Your poem has been created!`)
        selectAuthor(currentUser!.username)
        navigate('/userpoems')
      }
    }

  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>Title</Form.Label>
      <Form.Control value={newPoem.title} name='title' onChange={handleInputChange}></Form.Control>
      <Form.Label>Poem</Form.Label>
      <Form.Control value={newPoem.poem} name='poem' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Create Poem</Button>
    </Form>
    </>
  )
}