import React from 'react'
import { useEditor, useNode } from '@craftjs/core'
import * as EContainer from './ejectable/container'

const Container = (props: ContainerProps) => {
  const {
    connectors: { connect, drag },
    id,
  } = useNode()
  const {
    query: { node },
  } = useEditor()
  const isRoot = node(id).isRoot()

  return <EContainer.Container {...props} ref={(ref) => ref && connect(drag(ref))} isRoot={isRoot} />
}

const defaultProps = {
  width: 12,
}
Container.craft = {
  props: defaultProps,
  displayName: 'Container',
}
export type ContainerProps = EContainer.ContainerProps
export default Container
