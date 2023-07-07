import { login } from "../src/lib/apiwrapper"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import User from "../src/types/user"
import React from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    loginUser: (user:User)=>void,
    setLoggedIn:(loginstatus:boolean)=>void
}

export default function Login({loginUser,setLoggedIn}: Props) {


    const navigate = useNavigate();
    const [user,setUser] = useState<User>({email:'',username:'',about_me:'',password:''})
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const resp = await login(user.username, user.password)
        if(!resp){
            navigate('/')
        }
        if (resp.error){
            console.log('error')
            setLoggedIn(false)
            navigate('/')
        } else {
            localStorage.setItem('token', resp.data?.token as string)
            const token = localStorage.getItem('token')
            user.token=token       
            loginUser(resp.data as User)
            navigate('/');
        }
    }

  return (
    <>
        <Form onSubmit={handleFormSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control name='username' value={user.username} onChange={handleInputChange} />
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' value={user.password} onChange={handleInputChange} />
            <Button variant='outline-danger' type='submit' className='w-100 mt-3'>Log In</Button>
        </Form>
    </>
  )
}