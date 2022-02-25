import { useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import {
  elFlex,
  elFlexAlignCenter,
  elFlexColumn,
  elFlexJustifyCenter,
  elHFull,
  elPx6,
  elPy1,
  elPy3,
  elTextCenter,
  SmallText,
} from '@reapit/elements'
import React from 'react'

export * from './toolbar-item'
export * from './toolbar-section'
export * from './toolbar-text-input'
export * from './toolbar-dropdown'
export * from './types'

const ConnectedToolbar = () => {
  const { active, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first()
    return {
      active: currentlySelectedNodeId,
      related: currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    }
  })

  return <Toolbar active={active}>{active && related?.toolbar && React.createElement(related.toolbar)}</Toolbar>
}

export const Toolbar = ({ active, children }: { active: boolean; children: React.ReactNode }) => (
  <div className={cx(elPy1, elHFull)}>
    {children}
    {!active && (
      <div
        className={cx(
          elPx6,
          elPy3,
          elFlex,
          elFlexColumn,
          elFlexAlignCenter,
          elHFull,
          elFlexJustifyCenter,
          elTextCenter,
        )}
        style={{
          color: 'rgba(0, 0, 0, 0.5607843137254902)',
          fontSize: '11px',
        }}
      >
        <SmallText hasBoldText>Click on a component to start editing.</SmallText>
        <h2>You could also double click on the layers below to edit their names, like in Photoshop</h2>
      </div>
    )}
  </div>
)

export default ConnectedToolbar
