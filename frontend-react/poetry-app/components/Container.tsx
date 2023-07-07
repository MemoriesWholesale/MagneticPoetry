import update from 'immutability-helper'
import { CSSProperties, FC, useEffect } from 'react'
import { useCallback, useState } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Word } from './Word'
import { ItemTypes } from './ItemTypes'


interface DragItem {
    type: string
    id: string
    top: number
    left: number
  }

export type wordobj = {
    top:number,
    left:number,
    title:string
}

const styles: CSSProperties = {
  width: 700,
  height: 700,
  border: '3px solid black',
  position: 'relative',
  borderRadius: '10px'
}

export interface ContainerProps {
    wordList:string[],
    saveRequest:boolean,
    setPoemState:(poem:wordobj[])=>void,
    savePoem:()=>void
}

export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; title: string } }
}

export const Container: FC<ContainerProps> = ({ wordList,saveRequest,setPoemState,savePoem }) => {


    useEffect(()=>{setWords(draggify(wordList))},[wordList])

    function draggify(words:string[]):{
        [key: number]: wordobj
      }{

        
        let startl = 15
        let startt = 470
        
        
        function objectify(word:string):wordobj{
            if (startl+word.length*9+15>700){
                startl = 15
                startt += 30
            }
            let o = {top:startt,left:startl,title:word}
            startl += word.length*9+15
            return o
        }
        
        let objectified = words.map((w)=>objectify(w))
        
        return {...objectified}
        
        }


  const [words, setWords] = useState<{
    [key: number]: {
      top: number
      left: number
      title: string
    }
  }>(draggify(wordList))

  useEffect(()=>{
    const arrayified = Object.entries(words)
    const filtered = arrayified.filter((v)=>v[1].top<420)
    let arr = []
    for (let v of filtered){
        arr.push(v[1])
    }
    setPoemState(arr);
    savePoem()
    },
    [saveRequest])

  const moveWord = useCallback(
    (id: string, left: number, top: number) => {
      setWords(
        update(words, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [words, setWords],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.WORD,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveWord(item.id, left, top)
        return undefined
      },
    }),
    [moveWord],
  )

  return (
    <>
    <div ref={drop} style={styles}>
      {Object.keys(words).map((key) => {
        const { left, top, title } = words[parseInt(key)] as {
          top: number
          left: number
          title: string
        }
        return (
          <Word
            key={key}
            id={key}
            left={left}
            top={top}
          >
            {title}
          </Word>
        )
      })}
    <hr style = {{color:'black',opacity:'80%',position:'relative',top:450,borderTop:'230px solid',zIndex:-1,borderBottomLeftRadius:'5px',borderBottomRightRadius:'5px'}}/>
    </div>
    </>
  )
}

// JSON.stringify
// JSON.parse