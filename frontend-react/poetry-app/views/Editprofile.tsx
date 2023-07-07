import User from "../src/types/user"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { editUser } from "../src/lib/apiwrapper"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

type Props = {currentUser:User|null}

export default function Editprofile({currentUser}: Props) {
    const [user,setUser] = useState<User>({email:currentUser?.email||'',username:currentUser?.username||'',about_me:currentUser?.about_me||'',password:currentUser?.password||''})
    const navigate = useNavigate()
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const resp = await editUser(currentUser!.token!,user)
        if (resp.error){
          console.log('error')
        }else{
          console.log(`Your account has been edited!`)
          currentUser!.username = user.username
          currentUser!.email = user.email
          currentUser!.about_me = user.about_me
          navigate('/profile')
        }
      }
  return (
    <>
    <Form onSubmit={handleFormSubmit}>
      <Form.Label>Username {currentUser?.username}</Form.Label>
      <Form.Control value={user.username} name='username' onChange={handleInputChange}></Form.Control>
      <Form.Label>Email {currentUser?.email}</Form.Label>
      <Form.Control value={user.email} name='email' type='email' onChange={handleInputChange}></Form.Control>
      <Form.Label>About {currentUser?.about_me}</Form.Label>
      <Form.Control value={user.about_me} name='about_me' onChange={handleInputChange}></Form.Control>
      <Button variant='outline-dark' className='mt-3' type='submit'>Save Changes</Button>
    </Form>
    </>
  )
}