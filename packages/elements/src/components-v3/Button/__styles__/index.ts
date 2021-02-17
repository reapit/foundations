import { css } from 'linaria'
import { elIntentPrimary, elIntentInfo, elIntentSuccess, elIntentDanger } from '../../../styles-v3/base/intent'

export const elButton = css`
  display: inline-block;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.7rem 0.9rem;
  height: auto;
  background-color: var(--color-white, #fff);
  border-color: var(--color-grey-light, #dbdbdb);
  border-width: 1px;
  color: var(--color-black-light, #363636);
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;

  &.${elIntentPrimary} {
    background-color: var(--intent-primary);
    color: var(--intent-primary-text);
    border-color: transparent;
  }

  &.${elIntentInfo} {
    background-color: var(--intent-info);
    color: var(--intent-info-text);
    border-color: transparent;
  }

  &.${elIntentSuccess} {
    background-color: var(--intent-success);
    color: var(--intent-success-text);
    border-color: transparent;
  }

  &.${elIntentDanger} {
    background-color: var(--intent-danger);
    color: var(--intent-danger-text);
    border-color: transparent;
  }

  &[disabled] {
    opacity: 0.5;
  }
`

export const elIsFullWidth = css``
export const elIsLoading = css``
