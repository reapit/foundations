import { css } from 'linaria'
import { elIntentPrimary, elIntentInfo, elIntentSuccess, elIntentDanger } from '../../../styles-v3/base/intent'

const buttonBorderWidth = 1

export const elButton = css`
  display: inline-block;
  border-radius: var(--default-border-radius);
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1rem;
  height: auto;
  background-color: var(--color-white, #fff);
  border-color: var(--color-grey-light, #dbdbdb);
  border-width: ${buttonBorderWidth}px;
  color: var(--color-black-light, #363636);
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  position: relative;

  &${elIntentPrimary} {
    background-color: var(--intent-primary);
    color: var(--intent-primary-text);
    border-color: transparent;
  }

  &${elIntentInfo} {
    background-color: var(--intent-info);
    color: var(--intent-info-text);
    border-color: transparent;
  }

  &${elIntentSuccess} {
    background-color: var(--intent-success);
    color: var(--intent-success-text);
    border-color: transparent;
  }

  &${elIntentDanger} {
    background-color: var(--intent-danger);
    color: var(--intent-danger-text);
    border-color: transparent;
  }

  &[disabled] {
    opacity: 0.5;
  }
`

export const elButtonIsLoading = css``
export const elButtonIsDisabled = css``
export const elButtonHasLeftChevron = css`
  &::before {
    content: '';
    position: absolute;
    background-image: url('data:image/svg+xml;utf8,<svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0L9.79882 0C8.09608 0 6.57999 1.07793 6.02073 2.6862L0.456861 18.6862C0.160976 19.5371 0.160976 20.4629 0.456861 21.3138L6.02073 37.3138C6.57999 38.9221 8.09608 40 9.79882 40H24V0Z" fill="red"/></svg>');
    right: 0.5rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
    height: calc(100% + ${buttonBorderWidth * 2}px);
    top: -${buttonBorderWidth}px;
    width: 100%;
  }
`
export const elButtonHasRightChevron = css`
  &::after {
    content: '';
    position: absolute;
    background-image: url('data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L8.8012 0C10.5501 0 13.0962 2.1362 12.6186 2.80527L17.6261 18.8053C17.8695 19.5832 17.8695 20.4168 17.6261 21.1947L12.6186 37.1947C12.0962 38.8638 10.5501 40 8.8012 40H0V0Z" fill="red"/></svg>');
    right: -0.5rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    height: calc(100% + ${buttonBorderWidth * 2}px);
    top: -${buttonBorderWidth}px;
    width: 100%;
  }
`
