import { useAtom } from 'jotai'
import { showIframeAtom } from '../../../../store'

import { Thumbnail } from './Thumbnail'
import { componentList } from './schema'
import './index.less'
const ComList = () => {
  const [, setShowIframe] = useAtom<boolean>(showIframeAtom)

  return (
    <div className="com-list">
      {componentList.map((item) => (
        <div className="com-item">
          <Thumbnail item={item} setShowIframe={setShowIframe} />
        </div>
      ))}
    </div>
  )
}
export default ComList
