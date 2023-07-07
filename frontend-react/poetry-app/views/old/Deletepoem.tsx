import User from '../../src/types/user'
import Poem from '../../src/types/poem'
import { useNavigate } from 'react-router-dom'
import { deletePoem } from '../../src/lib/apiwrapper'
import Button from 'react-bootstrap/Button'

type Props = {currentUser:User|null,
            currentPoem:Poem|null}

export default function Deletepoem({currentUser,currentPoem}: Props) {
    const navigate = useNavigate()
  return (
  <>
  <h3>Are you sure you want to delete this poem?</h3>
  {currentPoem?.title} &nbsp;
  {currentPoem?.poem}
  <Button onClick={(e)=>{e.preventDefault();deletePoem(currentPoem!,currentUser!.token!);navigate('/yourpoems')}}>Yes</Button>
  <Button onClick={(e)=>{e.preventDefault();navigate('/userpoems')}}>No</Button>
  </>
  )
}