import React from 'react'
import { useNode } from '@craftjs/core'

const Container = ({ background, padding, children, width, height, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  return (
    <div
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      style={{ width, height, margin: '5px 0', background, padding: `${padding}px` }}
    >
      {children}
    </div>
  )
}

export default Container
