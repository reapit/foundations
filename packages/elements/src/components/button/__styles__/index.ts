import { isMobile } from '../../../styles/media'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { elIntentPrimary, elIntentDanger, elIntentCritical } from '../../../styles/intent'
import { elIsLoading } from '../../../styles/states'
import { ElIcon } from '../../icon/__styles__'

const buttonXPadding = 1
const buttonXPaddingMobile = 0.875
const buttonYPadding = 0.5
const buttonXYPaddingMobile = 0.375

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

export const ElButtonLoader = styled.div`
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

  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
  position: absolute;

  animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7);

  display: none;
  height: 1rem;
  width: 1rem;
`

export const elFloatingButton = css``
export const elButtonGroupAlignLeft = css``
export const elButtonGroupAlignRight = css``
export const elButtonGroupAlignCenter = css``
export const elButtonFixedWidth = css``

export const ElButton = styled.button`
  display: inline-flex;
  position: relative;
  padding: ${buttonYPadding}rem ${buttonXPadding}rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border-radius: var(--default-border-radius);
  border: 1px solid var(--color-grey-light);
  font-size: var(--font-size-small);
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-medium);
  background-color: unset;
  background-image: linear-gradient(to right, var(--color-white), var(--color-white));
  outline-color: var(--intent-primary);
  background-repeat: no-repeat;
  max-height: 2.25rem;

  &:hover {
    border: 1px solid var(--color-grey-medium-light);
    color: var(--color-grey-darkest);
  }

  &.${elIntentPrimary}, &.${elIntentCritical} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    color: var(--intent-primary-text);
    outline-color: var(--intent-primary-dark);
    border: 1px solid var(--intent-primary);

    &:hover {
      background-image: linear-gradient(to right, var(--intent-primary-dark), var(--intent-primary-dark));
      border: 1px solid var(--intent-primary-dark);
      color: var(--intent-primary-dark-text);
    }
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    color: var(--intent-danger-text);
    outline-color: var(--intent-danger-dark);
    border: 1px solid var(--intent-danger);

    &:hover {
      background-image: linear-gradient(to right, var(--intent-danger-dark), var(--intent-danger-dark));
      border: 1px solid var(--intent-danger-dark);
      color: var(--intent-danger-dark-text);
    }
  }

  &.${elButtonFixedWidth} {
    width: 9rem;

    ${isMobile} {
      width: 7.5rem;
    }
  }

  &[disabled],
  &[disabled].${elIntentDanger},
    &[disabled].${elIntentPrimary},
    &[disabled].${elIntentCritical},
    &.${elIsLoading}
    .${elIntentDanger},
    &.${elIsLoading}
    .${elIntentPrimary},
    &.${elIsLoading}
    .${elIntentCritical} {
    border: 1px solid var(--color-grey-light);
    color: var(--color-grey-medium-light);
    background-image: linear-gradient(to right, var(--color-grey-light), var(--color-grey-light));
    cursor: disabled;
  }

  &.${elIsLoading} {
    &${ElButtonLoader} {
      display: block;
    }
  }

  ${isMobile} {
    font-size: var(--font-size-small);
    padding: ${buttonXYPaddingMobile}rem ${buttonXPaddingMobile}rem;
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
      & ${ElButtonLoader} {
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
  svg {
    font-size: 12x;
  }
`

export const elButtonHasRightChevron = css`
  svg {
    font-size: 12x;
  }
`

export const ElButtonGroup = styled.div`
  display: grid;
`

export const ElButtonGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  column-gap: 0.75rem;
  row-gap: 0.75rem;
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
