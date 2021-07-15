import React from 'react'
import styled from 'styled-components'
import { useEditor, useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarSection } from '../Toolbar'

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(100px, 1fr));
  grid-template-rows: 1fr;
  align-items: center;

  ${(props) => !props.root && `grid-column: span ${props.width};`}
  ${(props) => props.root && 'width: 100%'}

  @media (max-width: 800px) {
    grid-template-rows: repeat(2, 1fr);
  }
`

const Container = ({
  padding,
  children,
  width,
  background,
  height,
  ...props
}: {
  [key: string]: any
  children?: React.ReactNode
}) => {
  const {
    connectors: { connect, drag },
    id,
    // actions: { setProp },
  } = useNode()
  const {
    query: { node },
  } = useEditor()
  const isRoot = node(id).isRoot()

  return (
    <ContainerDiv
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      width={width}
      isRoot={isRoot}
      style={{
        background,
        height,
        padding: `${padding}px`,
      }}
    >
      {children}
    </ContainerDiv>
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
