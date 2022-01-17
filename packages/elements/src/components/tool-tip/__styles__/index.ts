import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const ElToolTipChild = styled.div`
  position: absolute;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  color: var(--color-white);
  top: calc(-35px + -0.25rem);
  display: none;
  left: auto;
  right: auto;

  &:after {
    position: absolute;
    bottom: -0.5rem;
    left: calc(50% - 0.25rem);
    border: 0.25rem solid transparent;
    border-top-color: rgba(0, 0, 0, 0.8);
    content: '';
  }
`

export const elToolTipActive = css`
  display: block;
`

export const ElToolTipContainer = styled.div`
  position: relative;
  padding: 0.25rem;
`
