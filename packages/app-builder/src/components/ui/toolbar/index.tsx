import { useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
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

const ToolbarContainer = styled.div`
  padding: 16px;

  > div {
    margin-bottom: 12px;

    label {
      margin-right: 31px;
      min-width: 85px;
    }
  }
`

export const Toolbar = ({ children }: { children: React.ReactNode }) => (
  <ToolbarContainer className={cx(elPy1, elHFull)}>{children}</ToolbarContainer>
)

export default ConnectedToolbar
