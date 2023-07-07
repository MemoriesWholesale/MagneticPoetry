import update from 'immutability-helper'
import { CSSProperties, useEffect } from 'react'
import { useCallback, useState } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Word } from './Word'
import { ItemTypes } from './ItemTypes'
import { wordobj } from './Container'

type Props = { text:string,
    saveRequest:boolean,
    setPoemState:(poem:wordobj[])=>void,
    savePoem:()=>void }

interface DragItem {
    type: string
    id: string
    top: number
    left: number
  }

const styles: CSSProperties = {
    width: 700,
    height: 450,
    border: '3px solid black',
    position: 'relative',
    borderRadius: '10px'
  }


export default function Editframe({text,saveRequest,setPoemState,savePoem}: Props) {
    function reobjectify(txt:string):{
        [key: number]: wordobj
      }{
        if(txt){
        let splitted = txt.split(';')
        splitted.pop()
        let mapped = splitted.map((s)=>s.split('-'))
        function towordobj(a:string[]):wordobj{
            return {top:parseInt(a[0]),left:parseInt(a[1]),title:a[2]}
        }
        let objectified = mapped.map((a)=>towordobj(a))
        return {...objectified}
    }
    return {}
    }

    useEffect(()=>{
        const arrayified = Object.entries(words)
        let arr = []
        for (let v of arrayified){
            arr.push(v[1])
        }
        setPoemState(arr);
        savePoem()
        },
        [saveRequest])

    const [words, setWords] = useState<{
        [key: number]: {
          top: number
          left: number
          title: string
        }
      }>(reobjectify(text))

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
        </div>
        </>
      )
}