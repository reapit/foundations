import React from 'react'
import { styled } from '@linaria/react'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

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
  ref?: React.Ref<any>
  isRoot?: boolean
}

export const Container = ({ padding, children, width, background, height, ref, isRoot }: ContainerProps) => (
  <ContainerDiv
    width={width}
    ref={ref}
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
