import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const IconContainer = styled.div`
  position: relative;
  height: 140px;

  svg {
    height: 140px;
  }
`

export const searchMinWidth = css`
  min-width: 210px;
`

export const ControlsContainer = styled.div`
  background-color: #fff;
  margin-bottom: 0.5rem;
`

export const inputFullWidth = css`
  input {
    width: 100%;
  }
`

export const overflowHidden = css`
  overflow: hidden;
`

export const DownloadButtonContainer = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-100);
  border-radius: 0.25rem;
`

export const createCta = css`
  @media screen and (min-width: 1024px) {
    margin-left: 6rem;
  }
`
