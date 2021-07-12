import React from 'react'
import { useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarSection } from '../Toolbar'

const Container = ({
  padding,
  children,
  width,
  background,
  height,
  fixedWidth,
  ...props
}: {
  [key: string]: any
  children?: React.ReactNode
}) => {
  const {
    connectors: { connect, drag },
    // actions: { setProp },
  } = useNode()

  return (
    <div
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      style={{
        background,
        height,
        padding: `${padding}px`,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr',
        gridColumn: `span ${width}`,
        width: fixedWidth,
      }}
    >
      {children}
    </div>
  )
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
    <ToolbarItem propKey="width" type="number" label="Columns Wide" />
  </ToolbarSection>
)

Container.craft = {
  props: defaultProps,
  related: {
    toolbar: ContainerSettings,
  },
}

export default Container
