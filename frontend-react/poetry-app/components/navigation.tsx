import { Nav,NavLink,Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import User from "../src/types/user"

type Props = {isLoggedin:boolean,
            logoutUser:()=>void,
            currentUser:User|null,
            selectAuthor:(username:string)=>void}

export default function Navigation({isLoggedin,logoutUser,currentUser,selectAuthor}: Props) {
  return (
    <>
    <Navbar style={{backgroundColor:'black'}}>
        <Container>
            <Navbar.Brand id='brand' to = '/' as = {Link} style={{color:'white'}}>Magnetic Poetry</Navbar.Brand>
            <Nav className="me-auto">
                {isLoggedin?
                <>
                <NavLink to = '/explorecomps' as={Link} style={{color:'white'}}>Explore Poetry</NavLink>
                {/* <NavLink to = '/explore' as={Link}>Explore Poetry</NavLink> */}
                {/* <NavLink to = '/userpoems' as={Link} onClick={(_)=>selectAuthor(currentUser!.username)}>Your Poems</NavLink> */}
                <NavLink to = '/usercomps' as={Link} style={{color:'white'}} onClick={(_)=>selectAuthor(currentUser!.username)}>Your Poems</NavLink>
                {/* <NavLink to ='/followedpoems' as={Link}>Poets You Follow</NavLink> */}
                <NavLink to ='/followedcomps' as={Link} style={{color:'white'}}>Poets You Follow</NavLink>
                {/* <NavLink to = '/createpoem' as={Link}>Create a Poem</NavLink> */}
                <NavLink to = '/profile' as={Link} style={{color:'white'}}>Profile</NavLink>
                <NavLink to = '/compose' as={Link} style={{color:'white'}}>Compose</NavLink>
                <Button style={{backgroundColor:'aliceblue'}} className="btn-outline-dark" onClick={(e)=>{e.preventDefault();logoutUser()}}>Log Out</Button>
                </>:
                <>
                <NavLink to = '/register' as={Link} style={{color:'white'}}>Register</NavLink>
                <NavLink to = '/login' as={Link} style={{color:'white'}}>Log In</NavLink>
                </>}
            </Nav>
        </Container>
    </Navbar>
    </>
  )
}