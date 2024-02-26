import React from 'react'
import { IComponentItemProps } from '../comList/schema'
import { useAtom } from 'jotai'
import {
  cardsAtom,
  compActiveIndexAtom,
  scrollYAtom,
  showIframeAtom,
} from '../../../../store'
import './index.less'
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
    <div className="preview-wrap">
      <iframe
        className="preview-iframe"
        // src="http://localhost:3007/preview"
        scrolling="yes"
        frameBorder="0"
        id="previewIframe"
        style={{
          // visibility: showIframe ? 'visible' : 'hidden',
          // 调试阶段直接开启 visibility:'hidden'
          visibility: 'hidden',
        }}
      />
      <div
        className="clone-iframe"
        style={{
          // visibility: !showIframe ? 'visible' : 'hidden',
          // 调试阶段直接开启 visibility:'visible',
          visibility: 'visible',
          top: -(scrollY ?? 0) + 56 + 16 + 'px',
        }}></div>
    </div>
  )
}

export default Preview
