import React from 'react'
import { useEditor } from '@craftjs/core'
import Toolbox from '../ui/Toolbox'
import Header from '../ui/Header'

const Viewport = ({ children }) => {
  const { enabled, connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <div className="viewport" style={{ flex: 1, flexDirection: 'column', justifyItems: 'stretch', height: '100vh' }}>
      <Header />
      <div className="flex h-full overflow-hidden flex-row w-full">
        <Toolbox />
        <div className="page-container flex flex-1 h-full flex-col">
          <div
            className="craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto"
            style={{ backgroundColor: enabled ? '#e0e0e0' : undefined }}
            ref={(ref) =>
              ref &&
              // @ts-ignore
              connectors.select(connectors.hover(ref, null), null)
            }
          >
            <div className="relative flex-col flex items-center pt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewport
