import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import Savebutton from '../components/savebutton'
import { Container,wordobj } from '../components/Container'
import { getPoemWords } from '../src/lib/wordwrapper'

import User from '../src/types/user'
import Composition from '../src/types/composition'
import { createComposition } from '../src/lib/apiwrapper'

type Props = {currentUser:User|null}

export default function Compose({currentUser}: Props) {

    const [wordList,setWordList] = useState<string[]>([])

    const [waiting,setWaiting] = useState<boolean>(false)

    const getWords = async() =>{
        setWaiting(true)
        const resp = await getPoemWords()
        if (!resp){
            console.log('poemerror')
        }else{
            setWordList(resp)
            setWaiting(false)
        }
    }

    function stringify(poem:wordobj[]){
        let s = ""
        for (let w of poem){
            s += `${w.top}-${w.left}-${w.title};`
        }
        return s
    }

    const[poemState,setPoemState] = useState<wordobj[]>([])

    const savePoem = async ():Promise<void>=>{
        const poem:Composition = {text:stringify(poemState)}
        const resp = await createComposition(poem,currentUser?.token!)
        if (resp.error){
          console.log('error')
        }else{
          console.log(`Your composition has been saved!`)
          console.log(poem)
        }
        setSaveRequest(false)
      }

    const [saveRequest,setSaveRequest] = useState<boolean>(false)


    const requestSave = () =>{
        setSaveRequest(true)
    }

  return (
    <>
    <div className='d-flex justify-content-around'>
    <Button style={{backgroundColor:'mistyrose'}} className='my-2 btn-outline-dark' type='button' onClick={(_)=>getWords()}>Get Words</Button>
    <Savebutton requestSave={requestSave} />
    </div>
    <div className='d-flex justify-content-center align-items-center'>
        {waiting?
            <Spinner animation="grow" variant="secondary"/>:
            <DndProvider backend={HTML5Backend}>
                <Container wordList={wordList} saveRequest={saveRequest} setPoemState={setPoemState} savePoem={savePoem}/>
            </DndProvider>
        }
    </div>
    </>
  )
}