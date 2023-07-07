import type { CSSProperties, FC, ReactNode } from 'react'
import { useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
  position: 'absolute',
  border: '2px solid black',
  backgroundColor: 'white',
  padding: '0.1rem .25rem',
  cursor: 'grab',
  opacity:'100%',
  boxShadow: '1px 1px 0px 0px'
}

export interface WordProps {
  id: any
  left: number
  top: number
  children?: ReactNode
}

export const Word: FC<WordProps> = ({
  id,
  left,
  top,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.WORD,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

  if (isDragging) {
    return <div ref={drag} />
  }
  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
    >
      {children}
    </div>
  )
}
