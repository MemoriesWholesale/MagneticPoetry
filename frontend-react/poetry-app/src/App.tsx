import Navigation from "../components/navigation"
import { Route,Routes } from "react-router-dom"
import Container from "react-bootstrap/Container"
import User from "./types/user"
// import Poem from "./types/poem"
import Composition from "./types/composition"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Homepage from "../views/Homepage"
import Profile from "../views/Profile"
import Editprofile from "../views/Editprofile"
import Deleteprofile from "../views/Deleteprofile"
// import Explore from "../views/Explore"
// import Userpoems from "../views/Userpoems"
// import Followedpoems from "../views/Followedpoems"
// import Createpoem from "../views/Createpoem"
// import Editpoem from "../views/Editpoem"
// import Deletepoem from "../views/Deletepoem"
import Register from "../views/Register"
import Login from "../views/Login"
import Compose from "../views/Compose"
import Usercomps from "../views/Usercomps"
import Followedcomps from "../views/Followedcomps"
import Explorecomps from "../views/Explorecomps"
import Deletecomp from "../views/Deletecomp"
import Editcomp from "../views/Editcomp"


type Props = {}

export default function App({}: Props) {
  const navigate = useNavigate()
  const [isLoggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false)
  const [currentUser,setCurrentUser] = useState<User|null>({username:'',email:'',password:''})
  const loginUser = (user:User): void => {
    setCurrentUser(user);
    setLoggedIn(true);
}
  const logoutUser = (): void=>{
    setLoggedIn(false);
    setCurrentUser({username:'',email:'',password:''})
    navigate('/')
  }
  // const [currentPoem,setCurrentPoem] = useState<Poem|null>(null)
  // const selectPoem = (poem:Poem): void => {
  //   setCurrentPoem(poem)
  // }

  const [currentComp,setCurrentComp] = useState<Composition|null>(null)
  const selectComp = (composition:Composition): void => {
    setCurrentComp(composition)
  }

  const [currentAuthor,setcurrentAuthor] = useState<string|null>(null)
  const selectAuthor = (username:string):void=>{
    setcurrentAuthor(username)
  }
  return (
    <>
    <Navigation isLoggedin={isLoggedIn} logoutUser ={logoutUser} currentUser={currentUser} selectAuthor={selectAuthor}/>
    <Container>
      <Routes>
        <Route path = '/' element = {<Homepage/>}/>
        <Route path = '/profile' element = {<Profile currentUser={currentUser}/>}/>
        <Route path = '/editprofile' element = {<Editprofile currentUser={currentUser}/>}/>
        <Route path = '/deleteprofile' element = {<Deleteprofile currentUser={currentUser} logoutUser={logoutUser}/>}/>
        {/* <Route path = '/explore' element = {<Explore currentUser={currentUser} selectAuthor={selectAuthor}/>}/> */}
        {/* <Route path = '/userpoems' element = {<Userpoems currentUser={currentUser} username={currentAuthor} selectPoem={selectPoem}/>}/> */}
        {/* <Route path = '/followedpoems' element = {<Followedpoems currentUser={currentUser} selectAuthor={selectAuthor}/>}/> */}
        <Route path = '/explorecomps' element = {<Explorecomps currentUser={currentUser} selectAuthor={selectAuthor}/>}/>
        <Route path = '/followedcomps' element = {<Followedcomps currentUser={currentUser} selectAuthor={selectAuthor}/>}/>
        {/* <Route path = '/createpoem' element ={<Createpoem currentUser={currentUser} selectAuthor={selectAuthor}/>}/> */}
        {/* <Route path = '/editpoem' element = {<Editpoem currentUser={currentUser} currentPoem={currentPoem}/>}/> */}
        <Route path = '/editcomp' element = {<Editcomp currentUser={currentUser} currentComp={currentComp}/>}/>
        {/* <Route path = '/deletepoem' element = {<Deletepoem currentUser={currentUser} currentPoem={currentPoem}/>}/> */}
        <Route path = '/deletecomp' element = {<Deletecomp currentUser={currentUser} currentComp={currentComp}/>}/>
        <Route path = '/register' element = {<Register loginUser={loginUser}/>}/>
        <Route path = '/login' element = {<Login loginUser={loginUser} setLoggedIn={setLoggedIn}/>}/>
        <Route path = '/compose' element = {<Compose currentUser={currentUser}/>}/>
        <Route path = '/usercomps' element = {<Usercomps currentUser={currentUser} username={currentAuthor} selectComp={selectComp}/>}/>
      </Routes>
    </Container>
    </>
  )
}