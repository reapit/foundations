import { ToolTipChild } from './'
import React from 'react'

export const ToolTipStoryComponent = () => {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <div style={{ position: 'relative' }}>
        <ToolTipChild active={true}>Hello There</ToolTipChild>
      </div>
    </div>
  )
}
