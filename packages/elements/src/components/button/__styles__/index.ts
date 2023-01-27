import { isMobile } from '../../../styles/media'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCritical,
  elIntentSuccess,
  elIntentDanger,
  elIntentLow,
} from '../../../styles/intent'
import { elIsLoading } from '../../../styles/states'
import { intentPrimary, intentSecondary, intentCritical, intentSuccess, intentDanger } from '../../../styles/globals'
import { ElIcon } from '../../icon/__styles__'

const buttonXPadding = 1.75
const buttonXPaddingMobile = 1
const buttonHeight = 2.5
const buttonHeightMobile = 2

const chevronLeft = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0L9.79882 0C8.09608 0 6.57999 1.07793 6.02073 2.6862L0.456861 18.6862C0.160976 19.5371 0.160976 20.4629 0.456861 21.3138L6.02073 37.3138C6.57999 38.9221 8.09608 40 9.79882 40H24V0Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`
const chevronRight = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L8.8012 0C10.5501 0 13.0962 2.1362 12.6186 2.80527L17.6261 18.8053C17.8695 19.5832 17.8695 20.4168 17.6261 21.1947L12.6186 37.1947C12.0962 38.8638 10.5501 40 8.8012 40H0V0Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

export const elButtonSize2 = css`
  min-width: 8rem;

  ${isMobile} {
    min-width: 6rem;
  }
`

export const elButtonSize3 = css`
  min-width: 12rem;

  ${isMobile} {
    min-width: 8rem;
  }
`

export const elButtonSize4 = css`
  min-width: 16rem;

  ${isMobile} {
    min-width: 10rem;
  }
`

export const elFloatingButton = css``
export const elButtonGroupAlignLeft = css``
export const elButtonGroupAlignRight = css``
export const elButtonGroupAlignCenter = css``
export const elButtonFixedWidth = css``

export const ElButton = styled.button`
  display: inline-flex;
  position: relative;
  height: ${buttonHeight}rem;
  padding: 0 ${buttonXPadding}rem;
  justify-content: center;
  align-items: center;
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

  &.${elIntentPrimary} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    color: var(--intent-primary-text);
    outline-color: var(--intent-primary-dark);

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &.${elIntentSecondary} {
    background-image: linear-gradient(to right, var(--intent-secondary), var(--intent-secondary));
    color: var(--intent-secondary-text);
    outline-color: var(--intent-secondary-dark);

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &.${elIntentCritical} {
    background-image: linear-gradient(to right, var(--intent-critical), var(--intent-critical));
    color: var(--intent-critical-text);
    outline-color: var(--intent-critical-dark);

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &.${elIntentSuccess} {
    background-image: linear-gradient(to right, var(--intent-success), var(--intent-success));
    color: var(--intent-success-text);
    outline-color: var(--intent-success-dark);

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    color: var(--intent-danger-text);
    outline-color: var(--intent-danger-dark);

    &:hover {
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &.${elIntentLow} {
    background-image: linear-gradient(to right, var(--intent-low), var(--intent-low));
    outline-color: var(--intent-low);
  }

  &.${elButtonFixedWidth} {
    width: 9rem;

    ${isMobile} {
      width: 7.5rem;
    }
  }

  &[disabled] {
    opacity: 0.35;
  }

  &:hover {
    color: rgba(0, 97, 168, 0.75);
  }

  &.${elIsLoading} {
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

    &::before {
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

    &.${elIntentPrimary}, &.${elIntentSecondary}, &.${elIntentCritical}, &.${elIntentSuccess}, &.${elIntentDanger} {
      &::before {
        border-color: transparent transparent #fff #fff;
      }
    }
  }

  ${isMobile} {
    height: ${buttonHeightMobile}rem;
    font-size: 1rem;
    padding: 0 ${buttonXPaddingMobile}rem;
  }

  &.${elFloatingButton} {
    border-radius: 100%;
    height: 3.75rem;
    width: 3.75rem;
    margin: 0.5rem;

    padding: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    ${isMobile} {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0.5rem;
    }

    &.${elIsLoading} {
      &:before {
        left: inherit;
        top: inherit;
      }

      ${ElIcon} {
        visibility: hidden;
      }
    }
  }
`

export const elButtonHasLeftChevron = css`
  background-size: 100%;
  background-position-x: 0.5rem;
  padding-left: ${buttonXPadding + 0.5}rem;

  ${isMobile} {
    padding-left: 1.25rem;
  }

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

  &.${elIntentPrimary} {
    &::before {
      background-image: url('${chevronLeft(intentPrimary)}');
    }
  }

  &.${elIntentSecondary} {
    &::before {
      background-image: url('${chevronLeft(intentSecondary)}');
    }
  }

  &.${elIntentCritical} {
    &::before {
      background-image: url('${chevronLeft(intentCritical)}');
    }
  }

  &.${elIntentSuccess} {
    &::before {
      background-image: url('${chevronLeft(intentSuccess)}');
    }
  }

  &.${elIntentDanger} {
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

    padding-left: ${buttonXPadding}rem;
    padding-right: ${buttonXPadding}rem;

    &::after {
      right: -1rem;
    }

    &::before {
      left: -1rem;
    }
  }

  ${isMobile} {
    padding-right: 1.25rem;
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

  &.${elIntentPrimary} {
    &::after {
      background-image: url('${chevronRight(intentPrimary)}');
    }
  }

  &.${elIntentSecondary} {
    &::after {
      background-image: url('${chevronRight(intentSecondary)}');
    }
  }

  &.${elIntentCritical} {
    &::after {
      background-image: url('${chevronRight(intentCritical)}');
    }
  }

  &.${elIntentSuccess} {
    &::after {
      background-image: url('${chevronRight(intentSuccess)}');
    }
  }

  &.${elIntentDanger} {
    &::after {
      background-image: url('${chevronRight(intentDanger)}');
    }
  }
`

export const ElButtonGroup = styled.div`
  display: grid;
`

export const ElButtonGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  column-gap: 1rem;
  row-gap: 1rem;
  width: fit-content;

  .${elButtonSize2} {
    grid-column: span 2;
  }

  .${elButtonSize3} {
    grid-column: span 3;
  }

  .${elButtonSize4} {
    grid-column: span 4;
  }

  &.${elButtonGroupAlignLeft} {
    margin-right: auto;
    justify-content: flex-start;
  }

  &.${elButtonGroupAlignRight} {
    margin-left: auto;
    justify-content: flex-end;
  }

  &.${elButtonGroupAlignCenter} {
    margin: 0 auto;
    justify-content: center;
  }

  ${isMobile} {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 0.8rem;
    row-gap: 0.8rem;
    grid-auto-flow: inherit;

    .${elButtonSize4} {
      grid-column: span 3;
    }
  }
`
