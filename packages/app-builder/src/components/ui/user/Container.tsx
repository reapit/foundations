import React from 'react'
import { useNode } from '@craftjs/core'

const Container = ({ padding, children, width, background, height, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  return (
    <div
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      style={{ flex: width, background, height, padding: `${padding}px` }}
    >
      {children}
    </div>
  )
}

export default Container
