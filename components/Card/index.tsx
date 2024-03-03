import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import update from 'immutability-helper'
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

      // 被拖动的组件在原数组中的索引
      const dragIndex = item.originalIndex
      // 被拖动的组件当前应该放置的位置的索引
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      // 计算悬停位置的位置信息
      const hoverBoundingRect = ref?.current?.getBoundingClientRect()
      // 被拖动组件的容器的中心位置的垂直坐标
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // 拖拽操作中鼠标指针相对于浏览器视口的位置信息
      const clientOffset = monitor.getClientOffset()
      // 鼠标相对于拖拽目标元素顶部的垂直位置（相当于鼠标对于拖拽的盒子的顶部的距离）
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      /* 
        换句话说：防止在拖动过程中不必要的交换或重新排序，当被拖动的组件在其下方的空间中而不是中心点上方时，才会触发重新排序操作
        换句话说：防止在拖动过程中不必要的交换或重新排序，只有在被拖动的组件在其上方的空间中而不是中心点下方，才会触发重新排序
      */

      // 如果被拖动的组件的索引小于当前放置位置的索引 并且鼠标的垂直位置在被拖动组件容器的中心上方 那么就返回 不执行任何操作
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // 如果被拖动的组件的索引大于当前放置位置的索引 并且鼠标的垂直位置在被拖动组件容器的中心下方 那么就返回
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      if (item.originalIndex !== -1) {
        setCards((prevCards: IComponentItemProps[]) =>
          update(prevCards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevCards[dragIndex] as IComponentItemProps],
            ],
          })
        )
      } else {
        console.log('item.comp', item.comp)
        setCards((prevCards: IComponentItemProps[]) =>
          update(prevCards, {
            $splice: [[hoverIndex, 0, item.comp]],
          })
        )
      }
      item.originalIndex = hoverIndex
      setCompActiveIndex(hoverIndex)
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'comp',
    item: () => {
      return { comp: item, originalIndex: index }
    },
    isDragging: (monitor) => {
      return `card-${monitor.getItem().originalIndex}` === IDkey
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{
        opacity,
        border: '1px solid #blue',
      }}>
      Card
    </div>
  )
}
