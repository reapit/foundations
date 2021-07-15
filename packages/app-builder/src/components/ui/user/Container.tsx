import React from 'react'
import styled from 'styled-components'
import { useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarSection } from '../Toolbar'

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column: span ${(props) => props.width};
  grid-template-rows: 1fr;
  align-items: center;

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
    <ContainerDiv
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      width={width}
      style={{
        background,
        height,
        padding: `${padding}px`,
        width: fixedWidth,
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
