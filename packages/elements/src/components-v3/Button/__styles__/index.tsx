import { css } from 'linaria'
import { styled } from 'linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
} from '../../../styles-v3/base/intent'
import { elIsLoading } from '../../../styles-v3/base/states'
import {
  intentPrimary,
  intentSecondary,
  intentCritical,
  intentSuccess,
  intentDanger,
} from '../../../styles-v3/base/variables'

const buttonXPadding = 1.5
const chevronLeft = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0L9.79882 0C8.09608 0 6.57999 1.07793 6.02073 2.6862L0.456861 18.6862C0.160976 19.5371 0.160976 20.4629 0.456861 21.3138L6.02073 37.3138C6.57999 38.9221 8.09608 40 9.79882 40H24V0Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`
const chevronRight = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L8.8012 0C10.5501 0 13.0962 2.1362 12.6186 2.80527L17.6261 18.8053C17.8695 19.5832 17.8695 20.4168 17.6261 21.1947L12.6186 37.1947C12.0962 38.8638 10.5501 40 8.8012 40H0V0Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

export const ElButton = styled.button`
  display: inline-block;
  position: relative;
  height: auto;
  padding: 0.75rem ${buttonXPadding}rem;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  text-transform: uppercase;

  border-radius: var(--default-border-radius);
  border: none;

  font-size: 1rem;
  font-family: var(--font-sans-serif);
  font-weight: bold;
  color: var(--intent-primary);

  background-color: unset;
  background-image: linear-gradient(to right, var(--color-white), var(--color-white));
  outline-color: var(--intent-primary);
  background-repeat: no-repeat;

  &${elIntentPrimary} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    color: var(--intent-primary-text);
    outline-color: var(--intent-primary-dark);
  }

  &${elIntentSecondary} {
    background-image: linear-gradient(to right, var(--intent-secondary), var(--intent-secondary));
    color: var(--intent-secondary-text);
    outline-color: var(--intent-secondary-dark);
  }

  &${elIntentCritical} {
    background-image: linear-gradient(to right, var(--intent-critical), var(--intent-critical));
    color: var(--intent-critical-text);
    outline-color: var(--intent-critical-dark);
  }

  &${elIntentSuccess} {
    background-image: linear-gradient(to right, var(--intent-success), var(--intent-success));
    color: var(--intent-success-text);
    outline-color: var(--intent-success-dark);
  }

  &${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    color: var(--intent-danger-text);
    outline-color: var(--intent-danger-dark);
  }

  &[disabled] {
    opacity: 0.5;
  }

  &${elIsLoading} {
    @keyframes spinAround {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }

    color: transparent !important;
    pointer-events: none;

    &::after {
      left: calc(50% - (1em / 2));
      top: calc(50% - (1em / 2));
      position: absolute;

      animation: spinAround 500ms infinite linear;
      border: 2px solid #dbdbdb;
      border-radius: 290486px;
      border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7);

      content: '';
      display: block;
      height: 1rem;
      width: 1rem;
    }

    &${elIntentPrimary}, &${elIntentSecondary}, &${elIntentCritical}, &${elIntentSuccess}, &${elIntentDanger} {
      &::after {
        border-color: transparent transparent #fff #fff;
      }
    }
  }
`

export const elButtonHasLeftChevron = css`
  background-size: 100%;
  background-position-x: 0.5rem;
  padding-left: ${buttonXPadding + 0.5}rem;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: url('${chevronLeft('black')}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
  }

  &${elIntentPrimary} {
    &::before {
      background-image: url('${chevronLeft(intentPrimary)}');
    }
  }

  &${elIntentSecondary} {
    &::before {
      background-image: url('${chevronLeft(intentSecondary)}');
    }
  }

  &${elIntentCritical} {
    &::before {
      background-image: url('${chevronLeft(intentCritical)}');
    }
  }

  &${elIntentSuccess} {
    &::before {
      background-image: url('${chevronLeft(intentSuccess)}');
    }
  }

  &${elIntentDanger} {
    &::before {
      background-image: url('${chevronLeft(intentDanger)}');
    }
  }
`

export const elButtonHasRightChevron = css`
  background-size: 100%;
  background-position-x: -0.5rem;
  padding-right: ${buttonXPadding + 0.5}rem;

  &.${elButtonHasLeftChevron} {
    background-size: 100%;
    background-position-x: center;
  }

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    background-image: url('${chevronRight('black')}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
  }

  &${elIntentPrimary} {
    &::after {
      background-image: url('${chevronRight(intentPrimary)}');
    }
  }

  &${elIntentSecondary} {
    &::after {
      background-image: url('${chevronRight(intentSecondary)}');
    }
  }

  &${elIntentCritical} {
    &::after {
      background-image: url('${chevronRight(intentCritical)}');
    }
  }

  &${elIntentSuccess} {
    &::after {
      background-image: url('${chevronRight(intentSuccess)}');
    }
  }

  &${elIntentDanger} {
    &::after {
      background-image: url('${chevronRight(intentDanger)}');
    }
  }
`
