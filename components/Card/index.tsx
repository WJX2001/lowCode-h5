import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
// 组件类型接口
export interface IComponentItemProps {
  text: string // 组件区中组件的名称
  name: string // 组件区中组件的的key
  icon: string // 组件区中组件的icon地址
  config: {
    label: string // 配置区中title名称
    type: string // 配置区组件类型
    format: string
    value?: string
    config?: {
      // 默认配置项
      icon: string
      name?: string
      style?: React.CSSProperties
      tooltip: string
    }
    configOptions?: {
      // 配置区中组件配置列表
      icon: string
      name?: string
      style?: React.CSSProperties
      tooltip: string
    }[]
  }[]
}

export interface CardProps {
  item: IComponentItemProps
  index: number
  cards: [] | IComponentItemProps[]
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>
  IDkey: string
  compActiveIndex: number | null
  setCompActiveIndex: (compActiveIndex: number) => void
}

interface DragItem {
  originalIndex: number
  comp: IComponentItemProps
}

export const Card: React.FC<CardProps> = ({
  setCompActiveIndex,
  item,
  IDkey,
  cards,
  index,
  setCards,
  compActiveIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  // react 放置函数
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
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }

      // 记录原始索引
      const dragIndex = item.originalIndex
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      // 计算悬停位置的位置信息
      const hoverBoundingRect = ref?.current?.getBoundingClientRect()
      // 悬停位置中间点的信息
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // 拖拽操作中鼠标指针相对于浏览器视口的位置信息
      const clientOffset = monitor.getClientOffset()
      // 鼠标相对于拖拽目标元素顶部的垂直位置
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
    },
  })

  return <div>Card</div>
}
