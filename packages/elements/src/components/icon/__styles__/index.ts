import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
  elIntentNeutral,
  elIntentLow,
  elIntentPending,
  elIntentWarning,
} from '../../../styles/intent'

export const elIconSizeSmallest = css`
  font-size: 0.75rem;
`

export const elIconSizeSmall = css`
  font-size: var(--font-size-subheading);
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
  color: var(--color-black);

  svg {
    width: 1em;
    height: 1em;
  }

  &.${elIntentPrimary}, &.${elIntentCritical}, &.${elIntentSecondary} {
    color: var(--intent-primary);
  }
  &.${elIntentWarning} {
    color: var(--intent-warning);
  }
  &.${elIntentPending} {
    color: var(--intent-pending);
  }
  &.${elIntentSuccess} {
    color: var(--intent-success);
  }
  &.${elIntentDanger} {
    color: var(--intent-danger);
  }
  &.${elIntentNeutral}, &.${elIntentLow} {
    color: var(--intent-neutral);
  }
`
