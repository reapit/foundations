import { useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import {
  elFlex,
  elFlexAlignCenter,
  elFlexColumn,
  elFlexJustifyCenter,
  elHFull,
  elPb1,
  elPx4,
  elPy1,
  elPy2,
  elTextCenter,
} from '@reapit/elements'
import React from 'react'

export * from './ToolbarItem'
export * from './ToolbarSection'
export * from './ToolbarTextInput'
export * from './ToolbarDropdown'
export * from './types'

const Toolbar = () => {
  const { active, related } = useEditor((state) => ({
    active: state.events.selected,
    related: state.events.selected && state.nodes[state.events.selected].related,
  }))

  return (
    <div className={cx(elPy1, elHFull)}>
      {
        // @ts-ignore
        active && related?.toolbar && React.createElement(related.toolbar)
      }
      {!active && (
        <div
          className={cx(
            elPx4,
            elPy2,
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
          <h2 className={elPb1}>Click on a component to start editing.</h2>
          <h2>You could also double click on the layers below to edit their names, like in Photoshop</h2>
        </div>
      )}
    </div>
  )
}

export default Toolbar
