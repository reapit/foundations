import { useNode } from '@craftjs/core'
import React from 'react'
import Container from './container'
import { InfoProps, Info as EInfo } from './ejectable/info'

const defaultProps = {
  destination: '',
}

const Info = (props: InfoProps) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return <EInfo {...props} ref={(ref) => ref && connect(drag(ref))} />
}

Info.craft = {
  displayName: 'Info',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
}

export default Info
