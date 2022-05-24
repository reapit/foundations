import { useEditor } from '@craftjs/core'
import React, { useEffect, useState } from 'react'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { elFlex, elFlexColumn, elW2 } from '@reapit/elements'
import { bgWhite, transition } from './styles'

import SidebarItem from './sidebar-item'
import Toolbar from './toolbar'
import Toolbox from './toolbox'

export const SidebarDiv = styled.div`
  display: flex;
  width: 337px;
  background: #f8f8f8;
  margin-top: 5px;
  border-top-left-radius: 4px;
  overflow: hidden;
`

const Sidebar = () => {
  const { active } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first()
    const isRoot = currentlySelectedNodeId && query.node(currentlySelectedNodeId).isRoot()
    return {
      active: !!currentlySelectedNodeId && !isRoot,
    }
  })
  const [customizeVisible, setCustomizeVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setCustomizeVisible(true)
    } else {
      setCustomizeVisible(false)
    }
  }, [active])

  return (
    <SidebarDiv className={cx(transition, bgWhite, elW2)}>
      <div className={cx(elFlex, elFlexColumn)} style={{ height: 'calc(100vh - 45px)', flex: 1 }}>
        <SidebarItem
          title="Components"
          height={!customizeVisible ? '100%' : '0%'}
          expanded={!customizeVisible}
          onChange={(val) => setCustomizeVisible(!val)}
        >
          <Toolbox />
        </SidebarItem>
        {active && (
          <SidebarItem
            title="Customise"
            height={customizeVisible ? '100%' : '0%'}
            expanded={customizeVisible}
            onChange={(val) => setCustomizeVisible(val)}
          >
            <Toolbar />
          </SidebarItem>
        )}
      </div>
    </SidebarDiv>
  )
}

export default Sidebar
