import { CSSProperties } from 'react'


type Props = { text:string }


const styles: CSSProperties = {
    width: 700,
    height: 450,
    border: '3px solid black',
    position: 'relative',
    borderRadius: '10px'
  }


export default function Poemframe({text}: Props) {
    function destringify(txt:string){
        let splitted = txt.split(';')
        splitted.pop()
        return splitted.map((s)=>s.split('-'))
    }




  return (
    <>
    <div style={styles}>
      {destringify(text).map((word) => {
        const { left, top, title } = {
          top: parseInt(word[0]),
          left: parseInt(word[1]),
          title: word[2]
        }
        return (
          <div
            key={destringify(text).indexOf(word)}
            style={{left:left,top:top,position:'absolute',border: '2px solid black',padding: '0.1rem .25rem',boxShadow:'1px 1px 0px 0px'}}
          >
            {title}
          </div>
        )
      })}
    </div>
    </>
  )
}