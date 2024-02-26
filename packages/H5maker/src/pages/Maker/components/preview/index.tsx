import React from 'react'
import { IComponentItemProps } from '../comList/schema'
import { useAtom } from 'jotai'
import {
  cardsAtom,
  compActiveIndexAtom,
  scrollYAtom,
  showIframeAtom,
} from '../../../../store'

export interface ICardProps {
  scrollY: number
  cards: [] | IComponentItemProps[]
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>
  showIframe: boolean
  compActiveIndex: number | null
  setCompActiveIndex: (compActiveIndex: number) => void
}

const Preview = () => {
  const [cards, setCards] = useAtom<IComponentItemProps[] | []>(cardsAtom)
  const [scrollY] = useAtom<number>(scrollYAtom)
  const [showIframe] = useAtom<boolean>(showIframeAtom)
  const [compActiveIndex, setCompActiveIndex] = useAtom<number | null>(
    compActiveIndexAtom
  )
  return (
    <div>
      <iframe
        className="preview-iframe"
        // src="http://localhost:3007/preview"
        scrolling="yes"
        frameBorder="0"
        id="previewIframe"
        style={
          {
            // visibility: showIframe ? 'visible' : 'hidden',
            // 调试阶段直接开启 visibility:'hidden'
            // visibility:'hidden'
          }
        }
      />
    </div>
  )
}

export default Preview
