import React from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import Preview from './components/preview'
import TopBar from './components/topBar'
import ComList from './components/comList'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Maker: React.FC = () => {
  const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement

  // 获取当前参数
  const { id } = useParams()
  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        <TopBar />
        <ComList />
      </DndProvider>
    </div>
  )
}

export default Maker
