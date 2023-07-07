import { ButtonGroup } from "react-bootstrap"
import User from "../src/types/user"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"


type Props = {currentUser:User|null}

export default function Profile({currentUser}: Props) {
    const navigate = useNavigate()
    return (
    <>
        <ul>
            <li>Username:&nbsp;{currentUser?.username}</li>
            <li>Email:&nbsp;{currentUser?.email}</li>
            <li>About:&nbsp;{currentUser?.about_me}</li>
        </ul>
        <ButtonGroup>
        <Button style={{backgroundColor:'white'}} className="btn-outline-dark" onClick={(e)=>{e.preventDefault();navigate('/editprofile')}}>Edit</Button>
        <Button style={{backgroundColor:'white'}} className="btn-outline-danger" onClick={(e)=>{e.preventDefault();navigate('/deleteprofile')}}>Delete</Button>
        </ButtonGroup>
    </>
  )
}