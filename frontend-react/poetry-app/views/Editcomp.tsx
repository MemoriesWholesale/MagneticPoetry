import { useState } from "react"
import User from "../src/types/user"
import { editComposition } from "../src/lib/apiwrapper"
import Composition from "../src/types/composition"
import Editframe from "../components/editframe"
import Savebutton from "../components/savebutton"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { wordobj } from "../components/Container"

type Props = {currentUser:User|null,
            currentComp:Composition|null}

export default function Editcomp({currentUser,currentComp}: Props) {
    const[poemState,setPoemState] = useState<wordobj[]>([])

    function stringify(poem:wordobj[]){
        let s = ""
        for (let w of poem){
            s += `${w.top}-${w.left}-${w.title};`
        }
        return s
    }

    const savePoem = async ():Promise<void>=>{
        const poem:Composition = {text:stringify(poemState)}
        const resp = await editComposition(currentComp!,poem,currentUser?.token!)
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
    <div>
    <DndProvider backend={HTML5Backend}>
        <Editframe text={currentComp?.text!} saveRequest={saveRequest} setPoemState={setPoemState} savePoem={savePoem}/>
    </DndProvider>
    <Savebutton requestSave={requestSave}/>
    </div>
  )
}