import React, { useContext } from 'react'
import { useEditor } from '@craftjs/core'
import IFrame, { FrameContext } from 'react-frame-component'
import { StyleSheetManager } from 'styled-components'
import Toolbox from '../ui/Toolbox'
import Header from '../ui/Header'
import Sidebar from '../ui/Sidebar'

const InjectFrameStyles = (props) => {
  const { document } = useContext(FrameContext)
  return <StyleSheetManager target={document.head}>{props.children}</StyleSheetManager>
}

const Viewport = ({ children, iframeRef }) => {
  const { enabled, connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <div className="viewport" style={{ flex: 1, flexDirection: 'column', justifyItems: 'stretch', height: '100vh' }}>
      <Header />
      <div className="flex overflow-hidden flex-row w-full" style={{ height: 'calc(100vh - 45px)' }}>
        <Toolbox />
        <IFrame style={{ width: 1280 }} ref={iframeRef}>
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
          <div id="page-container" className="page-container flex flex-1 h-full flex-col">
            <div
              className="craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto"
              style={{ backgroundColor: enabled ? '#e0e0e0' : undefined }}
              ref={(ref) =>
                ref &&
                // @ts-ignore
                connectors.select(connectors.hover(ref, null), null)
              }
            >
              <div className="relative flex-row flex items-stretch pt-8 m-auto" style={{ width: 1024 }}>
                <InjectFrameStyles>{children}</InjectFrameStyles>
              </div>
            </div>
          </div>
        </IFrame>
        <Sidebar />
      </div>
    </div>
  )
}

export default Viewport
