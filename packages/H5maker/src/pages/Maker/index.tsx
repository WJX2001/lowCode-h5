import React from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import Preview from './components/preview'
import TopBar from './components/topBar'

const Maker: React.FC = () => {
  const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement

  // 获取当前参数
  const { id } = useParams()
  return (
    <div className="container">
      <TopBar />
    </div>
  )
}

export default Maker
