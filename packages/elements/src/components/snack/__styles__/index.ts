import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentWarning,
  elIntentDanger,
} from '../../../styles/intent'

export const ElSnack = styled.div`
  display: inline-flex;
  border-radius: var(--default-border-radius);
  padding: 0.75rem 0.75rem;
  align-items: center;
  background: var(--color-grey-100);
  color: var(--color-black);
  font-size: var(--font-size-default);

  &.${elIntentSecondary}, &.${elIntentPrimary} {
    background: var(--intent-primary-lightest);
    color: var(--intent-primary-lightest-text);
  }

  &.${elIntentCritical}, &.${elIntentWarning} {
    background: var(--intent-warning-lightest);
    color: var(--intent-warning-lightest-text);
  }

  &.${elIntentSuccess} {
    background: var(--intent-success-lightest);
    color: var(--intent-success-lightest-text);
  }

  &.${elIntentDanger} {
    background: var(--intent-danger-lightest);
    color: var(--intent-danger-lightest-text);
  }
`

export const elSnackIcon = css`
  margin-right: 1rem;
`

export const elSnackCloseIcon = css`
  cursor: pointer;
  padding-left: 0.5rem;
  color: var(--color-black);
`

export const ElSnackHolder = styled.div`
  position: fixed;
  z-index: 100;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${ElSnack} {
    display: flex;
    margin-bottom: 1rem;
    /* box-shadow: 3px 3px 5px var(--color-grey-400); */
  }
`
