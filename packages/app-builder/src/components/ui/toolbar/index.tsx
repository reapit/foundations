import { useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import { elHFull, elPy1 } from '@reapit/elements'
import React from 'react'

export * from './toolbar-item'
export * from './toolbar-text-input'
export * from './toolbar-dropdown'
export * from './types'

const ConnectedToolbar = () => {
  const { related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first()
    return {
      related: currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    }
  })

  return <Toolbar>{related?.toolbar && React.createElement(related.toolbar)}</Toolbar>
}

export const Toolbar = ({ children }: { children: React.ReactNode }) => (
  <div className={cx(elPy1, elHFull)}>{children}</div>
)

export default ConnectedToolbar
