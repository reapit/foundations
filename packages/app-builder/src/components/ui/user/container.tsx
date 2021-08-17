import React from 'react'
import { styled } from '@linaria/react'
import { useEditor, useNode } from '@craftjs/core'
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../viewport/__styles__/media'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'

const ContainerDiv = styled.div<{ width: number }>`
  display: flex;
  align-items: center;
  justify-items: space-between;

  flex: ${(props) => props.width};

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    flex: ${(props) => props.width * 2};
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    align-items: flex-start;
    flex-direction: column;
    flex: 12;
  }
`

export interface ContainerProps {
  padding?: number
  background?: string
  height?: number
  width: number
  children?: React.ReactNode
}

const Container = ({ padding, children, width, background, height, ...props }: ContainerProps) => {
  const {
    connectors: { connect, drag },
    id,
  } = useNode()
  const {
    query: { node },
  } = useEditor()
  const isRoot = node(id).isRoot()

  return (
    <ContainerDiv
      {...props}
      width={width}
      ref={(ref) => ref && connect(drag(ref))}
      style={{
        background,
        height,
        padding: `${padding}px`,
        flex: isRoot ? 'unset' : undefined,
        width: isRoot ? '100%' : undefined,
        display: isRoot ? 'block' : undefined,
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
