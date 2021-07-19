import React from 'react'
import styled from 'styled-components'
import { useEditor, useNode } from '@craftjs/core'
import BREAKPOINT from '../../../utils/breakpoints'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../Toolbar'

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;

  ${(props) => !props.root && `flex: ${props.width};`}
  ${(props) => props.root && 'width: 100%'}

  @media (max-width: ${BREAKPOINT.Tablet}px) {
    ${(props) => !props.root && `flex: ${props.width * 2};`}
  }
  @media (max-width: ${BREAKPOINT.MobileL}px) {
    ${(props) => !props.root && `flex: ${props.width * 3};`}
  }
  @media (max-width: ${BREAKPOINT.MobileS}px) {
    align-items: flex-start;
    flex-direction: column;
    ${(props) => !props.root && 'flex: 12;'}
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
