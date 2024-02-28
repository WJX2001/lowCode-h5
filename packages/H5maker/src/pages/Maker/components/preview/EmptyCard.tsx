import React, { useRef } from 'react'
import { IComponentItemProps } from '../comList/schema'
import { useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import classnames from 'classnames'
export interface EmptyCardProps {
  cards: [] | IComponentItemProps[]
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>
  setCompActiveIndex: (compActiveIndex: number) => void
}
interface DragItem {
  originalIndex: number // 初始的索引值
  comp: IComponentItemProps // 组件的信息
}

const EmptyCard: React.FC<EmptyCardProps> = (props) => {
  const { cards, setCards, setCompActiveIndex } = props

  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'comp',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop: (item, monitor) => {
      if (!ref.current) {
        return
      }
      setCards([item.comp])
      setCompActiveIndex(0)
    },
  })

  drop(ref)

  return (
    <div
      ref={ref}
      className={classnames('empty-card-container')}
      data-handler-id={handlerId}>
      组件放置区
    </div>
  )
}

export default EmptyCard
