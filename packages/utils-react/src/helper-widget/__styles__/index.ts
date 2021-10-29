import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const slideOutIsActive = css``

export const WidgetContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 1;
`

export const SlideOutContainer = styled.div`
  width: 22.5rem;
  height: 100%;
  position: absolute;
  right: -22.5rem;
  top: 0;
  transition: right 0.5s ease-in-out;

  &.${slideOutIsActive} {
    right: 0;
  }
`
