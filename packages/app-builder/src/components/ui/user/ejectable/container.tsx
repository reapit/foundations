import React, { forwardRef } from 'react'
import { styled } from '@linaria/react'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

const ContainerDiv = styled.div<{ width: number }>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  justify-self: stretch;
  grid-column: span ${(props) => props.width};

  @media (max-width: ${TABLET_BREAKPOINT}px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const ComponentWrapper = styled.div<{ width: number }>`
  justify-self: stretch;
  grid-column: span ${(props) => props.width};
`

export interface ContainerProps {
  padding?: number
  background?: string
  height?: number
  width: number
  children?: React.ReactNode
  isRoot?: boolean
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ padding, children, width, background, height, isRoot }, ref) => (
    <ContainerDiv
      width={width}
      ref={ref}
      style={{
        background: isRoot ? undefined : background,
        height,
        padding: isRoot ? undefined : `${padding}px`,
        width: isRoot ? '100%' : undefined,
      }}
    >
      {children}
    </ContainerDiv>
  ),
)
