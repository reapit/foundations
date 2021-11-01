import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const slideOutIsActive = css``
export const widgetIsActive = css``

export const WidgetContainer = styled.div`
  background-color: var(--color-blue-dark);
  position: absolute;
  display: flex;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 12;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: flex-end;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  &.${widgetIsActive} {
    width: 20.25rem;
  }
`

export const WidgetButton = styled.button`
  border: none;
  border-radius: 50%;
`

export const SlideOutContainer = styled.div`
  background-color: var(--color-white);
  width: 22.5rem;
  height: 100%;
  position: absolute;
  right: -22.5rem;
  top: 0;
  transition: right 0.5s ease-in-out;
  z-index: 11;

  &.${slideOutIsActive} {
    right: 0;
  }
`
