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
import React, { FC } from 'react'

export * from './toolbar-item'
export * from './toolbar-section'
export * from './toolbar-text-input'
export * from './toolbar-dropdown'
export * from './types'

const Toolbar: FC = () => {
  const { active, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first()
    return {
      active: currentlySelectedNodeId,
      related: currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    }
  })

  return (
    <div className={cx(elPy1, elHFull)}>
      {
        // @ts-ignore
        active && related?.toolbar && React.createElement(related.toolbar)
      }
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
}

export default Toolbar
