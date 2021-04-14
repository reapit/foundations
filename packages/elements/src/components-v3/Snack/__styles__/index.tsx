import { css } from 'linaria'
import { styled } from 'linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
} from '../../../styles-v3/base/intent'

export const ElSnack = styled.div`
  display: inline-flex;
  border-radius: var(--default-border-radius);
  padding: 0.75rem 1.25rem;
  align-items: center;

  &${elIntentPrimary} {
    background: var(--intent-primary-light);
    color: var(--intent-primary-light-text);
  }

  &${elIntentSecondary} {
    background: var(--intent-secondary-light);
    color: var(--intent-secondary-light-text);
  }

  &${elIntentCritical} {
    background: var(--intent-critical-light);
    color: var(--intent-critical-light-text);
  }

  &${elIntentSuccess} {
    background: var(--intent-success-light);
    color: var(--intent-success-light-text);
  }

  &${elIntentDanger} {
    background: var(--intent-danger-light);
    color: var(--intent-danger-light-text);
  }
`

export const elSnackIcon = css`
  margin-right: 0.5rem;
`

export const elSnackCloseIcon = css`
  cursor: pointer;
  padding-left: 0.5rem;
  color: var(--color-black);
`
