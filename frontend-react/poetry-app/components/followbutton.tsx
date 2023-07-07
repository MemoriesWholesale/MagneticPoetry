import Button from "react-bootstrap/Button"
import { follow,unfollow } from "../src/lib/apiwrapper"
import User from "../src/types/user"
import { useState } from "react"

type Props = {is_following:boolean,
            username:string,
            currentUser:User}

export default function Followbutton({is_following,username,currentUser}: Props) {
    const [following,setFollowing]=useState(is_following)
  return (<>
    {following?
        <Button className="btn-outline-danger" onClick={(_)=>{unfollow(username,currentUser.token!);setFollowing(!following)}}>Unfollow</Button>:
        <Button className="btn-outline-dark" onClick={(_)=>{follow(username,currentUser.token!);setFollowing(!following)}}>Follow</Button>}
    </>
  )
}