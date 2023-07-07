
import Button from 'react-bootstrap/Button'


type Props = { requestSave:()=>void }

export default function Savebutton({requestSave}: Props) {
  return (
    <Button style={{backgroundColor:'lavender'}} className='my-2 btn-outline-dark' type='button' onClick={(_)=>{requestSave()}}>Save Poem</Button>
  )
}