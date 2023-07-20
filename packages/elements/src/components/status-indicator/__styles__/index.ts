import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
  elIntentWarning,
} from '../../../styles/intent'

export const elShapeTag = css``

export const ElStatusIndicator = styled.span`
  border-radius: 3rem;
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  background: var(--color-grey-medium);

  &.${elIntentPrimary}, &.${elIntentSecondary}, &.${elIntentCritical} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    color: var(--intent-primary-text);
    outline-color: var(--intent-primary-dark);
  }

  &.${elIntentWarning} {
    background-image: linear-gradient(to right, var(--intent-warning), var(--intent-warning));
    color: var(--intent-warning-text);
    outline-color: var(--intent-warning-dark);
  }

  &.${elIntentSuccess} {
    background-image: linear-gradient(to right, var(--intent-success), var(--intent-success));
    color: var(--intent-success-text);
    outline-color: var(--intent-success-dark);
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    color: var(--intent-danger-text);
    outline-color: var(--intent-danger-dark);
  }

  &.${elShapeTag} {
    border-radius: 1rem 0.2rem 0.2rem 1rem;
    height: 2rem;
    width: 0.5rem;
    margin-left: 0;
  }
`
