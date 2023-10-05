import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const visiblyHidden = css`
  visibility: hidden;
  height: 0;
  padding: 0;
`

export const ControlsContainer = styled.div`
  background-color: #fff;
  margin-bottom: 0.5rem;

  &.${visiblyHidden} {
    visibility: hidden;
    height: 0;
    padding: 0;
  }
`

export const inputFullWidth = css`
  input {
    width: 100%;
  }
`

export const overflowHidden = css`
  overflow: hidden;
`
