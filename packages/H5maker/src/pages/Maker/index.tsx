import React from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

const Maker: React.FC = () => {
  const iFrame = document.getElementById('previewIframe') as HTMLIFrameElement

  // 获取当前参数
  const { id } = useParams()
  return <>11111</>
}

export default Maker
