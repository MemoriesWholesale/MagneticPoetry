import User from '../src/types/user'
import Composition from '../src/types/composition'
import { useNavigate } from 'react-router-dom'
import { deleteComposition } from '../src/lib/apiwrapper'
import Button from 'react-bootstrap/Button'
import Poemframe from '../components/poemframe'

type Props = {currentUser:User|null,
            currentComp:Composition|null}

export default function Deletecomp({currentUser,currentComp}: Props) {
    const navigate = useNavigate()
  return (
  <>
  <h3>Are you sure you want to delete this poem?</h3>
  <Poemframe text ={currentComp?.text!}/>
  <Button onClick={(e)=>{e.preventDefault();deleteComposition(currentComp!,currentUser!.token!);navigate('/usercomps')}}>Yes</Button>
  <Button onClick={(e)=>{e.preventDefault();navigate('/usercomps')}}>No</Button>
  </>
  )
}