import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ControlsContainer = styled.div`
  background-color: #fff;
  margin-bottom: 0.5rem;
  width: 100%;
`

export const inputFullWidth = css`
  input {
    width: 100%;
  }
`

export const DisplayChip = styled.span`
  background: var(--color-grey-light);
  color: var(--color-grey-dark);
  font-size: var(--font-size-small);
  border-radius: 1rem;
  padding: 0.25rem 0.625rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  display: inline-block;
`

export const threeColTable = css`
  grid-template-columns: repeat(3, 1fr);
`

export const customModal = css`
  max-height: 60vh;
`
