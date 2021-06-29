import { css } from 'linaria'
import { styled } from 'linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
} from '../../../styles/intent'

export const elIconSizeSmallest = css`
  font-size: 0.75rem;
`

export const elIconSizeSmall = css`
  font-size: 1.25rem;
`

export const elIconSizeMedium = css`
  font-size: 2.5rem;
`

export const elIconSizeLarge = css`
  font-size: 5rem;
`

export const elIconSizeLargest = css`
  font-size: 8.75rem;
`

export const elIconMenu = css`
  svg {
    background: var(--nav-menu-background-dark);
  }
`

export const ElIcon = styled.span`
  display: flex;
  color: black;

  &${elIntentPrimary} {
    color: var(--intent-primary);
  }
  &${elIntentSecondary} {
    color: var(--intent-secondary);
  }
  &${elIntentCritical} {
    color: var(--intent-critical);
  }
  &${elIntentSuccess} {
    color: var(--intent-success);
  }
  &${elIntentDanger} {
    color: var(--intent-danger);
  }
  &${elIntentNeutral} {
    color: var(--intent-primary-text);
  }
`
