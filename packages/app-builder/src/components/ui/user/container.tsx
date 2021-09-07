import React from 'react'
import { useEditor, useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import { ContainerProps, Container as Econtainer } from './ejectable/container'
export { ContainerProps } from './ejectable/container'

const Container = (props: ContainerProps) => {
  const {
    connectors: { connect, drag },
    id,
  } = useNode()
  const {
    query: { node },
  } = useEditor()
  const isRoot = node(id).isRoot()

  return <Econtainer {...props} ref={(ref) => ref && connect(drag(ref))} isRoot={isRoot} />
}

const defaultProps = {
  width: 12,
}

const ContainerSettings = () => (
  <ToolbarSection
    title="Size"
    props={['width']}
    summary={({ width }: any) => {
      return `${width || ''} wide`
    }}
  >
    <ToolbarItem propKey="width" type={ToolbarItemType.Number} label="Columns Wide" />
  </ToolbarSection>
)

Container.craft = {
  props: defaultProps,
  related: {
    toolbar: ContainerSettings,
  },
}

export default Container
