import { useState } from "react"
import User from "../src/types/user"
import { editPoem } from "../src/lib/apiwrapper"
import Poem from "../src/types/poem"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

type Props = {currentUser:User|null,
            currentPoem:Poem|null}

export default function Editpoem({currentUser,currentPoem}: Props) {
    const [newPoem,setNewPoem] = useState<Poem>({title:currentPoem?.title||'',poem:currentPoem?.poem||''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
      setNewPoem({...newPoem,[e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
      e.preventDefault();
      const resp = await editPoem(currentPoem!,newPoem,currentUser?.token!)
      if (resp.error){
        console.log('error')
      }else{
        console.log(`Your question has been edited!`)
        navigate('/userpoems')
      }
    }

  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>Title {currentPoem?.title}</Form.Label>
      <Form.Control value={newPoem.title} name='title' onChange={handleInputChange}></Form.Control>
      <Form.Label>Poem {currentPoem?.poem}</Form.Label>
      <Form.Control value={newPoem.poem} name='poem' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Save Changes</Button>
    </Form>

    </>
  )
}