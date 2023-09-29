import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import {
  elIntentPrimary,
  elIntentSuccess,
  elIntentDanger,
  elIntentWarning,
  elIntentPending,
  elIntentDefault,
  elIntentNeutral,
} from '../../../styles/intent'

export const elShapeTag = css``

export const ElStatusIndicator = styled.span`
  border-radius: 3rem;
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  background: var(--color-grey-400);
  color: var(--color-black);

  &.${elIntentPrimary} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    outline-color: var(--intent-primary-dark);
  }

  &.${elIntentNeutral} {
    background-image: linear-gradient(to right, var(--intent-neutral), var(--intent-neutral));
    outline-color: var(--intent-neutral-dark);
  }

  &.${elIntentSuccess} {
    background-image: linear-gradient(to right, var(--intent-success), var(--intent-success));
    outline-color: var(--intent-success-dark);
  }

  &.${elIntentPending} {
    background-image: linear-gradient(to right, var(--intent-pending), var(--intent-pending));
    outline-color: var(--intent-pending-dark);
  }

  &.${elIntentWarning} {
    background-image: linear-gradient(to right, var(--intent-warning), var(--intent-warning));
    outline-color: var(--intent-warning-dark);
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    outline-color: var(--intent-danger-dark);
  }

  &.${elIntentDefault} {
    background-image: linear-gradient(to right, var(--intent-default), var(--intent-default));
    outline-color: var(--intent-default-dark);
  }

  &.${elShapeTag} {
    border-radius: 1rem 0.2rem 0.2rem 1rem;
    height: 2rem;
    width: 0.5rem;
    margin-left: 0;
  }
`
