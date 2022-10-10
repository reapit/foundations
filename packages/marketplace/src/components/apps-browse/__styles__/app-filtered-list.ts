import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { forMobileAndAbove } from '../../../core/__styles__/media'

export const cardCursor = css`
  cursor: pointer;
`

export const IsFreeNotice = styled.span`
  z-index: 50;
  color: var(--color-white);
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  background: var(--intent-secondary);
  margin-right: auto;

  ${forMobileAndAbove} {
    margin-right: 0;
  }
`
