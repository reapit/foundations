import { useEditor } from '@craftjs/core'
import { Layers } from '@craftjs/layers'
import React, { useState } from 'react'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { elFlex, elFlexColumn, elW2 } from '@reapit/elements'
import { bgWhite, transition } from './styles'

import SidebarItem from './sidebar-item'
import CustomizeIcon from '../icons/customize'
import LayerIcon from '../icons/layer'
import Toolbar from './toolbar'

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  width: 280px;
  opacity: ${(props) => {
    return props.enabled ? 1 : 0
  }};
  background: #fff;
  margin-right: ${(props) => {
    return props.enabled ? 0 : -280
  }}px;
`

const Sidebar = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))
  const [layersVisible, setLayerVisible] = useState(true)
  const [toolbarVisible, setToolbarVisible] = useState(true)

  return (
    <SidebarDiv enabled={enabled} className={cx(transition, bgWhite, elW2)}>
      <div className={cx(elFlex, elFlexColumn)} style={{ height: 'calc(100vh - 45px)' }}>
        <SidebarItem
          icon={CustomizeIcon}
          title="Customize"
          height={!layersVisible ? 'full' : '55%'}
          expanded={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayerIcon}
          title="Layers"
          height={!toolbarVisible ? 'full' : '45%'}
          expanded={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <Layers expandRootOnLoad={true} />
        </SidebarItem>
      </div>
    </SidebarDiv>
  )
}

export default Sidebar
