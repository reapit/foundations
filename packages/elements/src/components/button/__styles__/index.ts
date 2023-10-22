import { isMobile } from '../../../styles/media'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { elIntentPrimary, elIntentDanger, elIntentDefault } from '../../../styles/intent'
import { elIsLoading } from '../../../styles/states'
import { ElIcon } from '../../icon/__styles__'

const buttonXPadding = 1
const buttonXPaddingMobile = 0.875
const buttonYPadding = 0.5
const buttonXYPaddingMobile = 0.375

// Deprecated - to remove at v5
export const elButtonSize2 = css``
export const elButtonSize3 = css``
export const elButtonSize4 = css``

export const elButtonSizeSmall = css``
export const elButtonSizeLarge = css``
export const elButtonSizeMedium = css``
export const elButtonIconOnly = css``

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
  animation: spinAround 500ms infinite linear;
  border: 2px solid var(--color-grey-400);
  margin-right: 0.5rem;
  border-radius: 290486px;
  border-color: transparent transparent var(--color-grey-400) var(--color-grey-400);
  display: none;
  height: 0.75rem;
  width: 0.75rem;
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
  border: 1px solid var(--color-grey-100);
  font-size: var(--font-size-small);
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-400);
  background-color: unset;
  background-image: linear-gradient(to right, var(--color-white), var(--color-white));
  outline-color: var(--intent-primary);
  background-repeat: no-repeat;
  height: 2.25rem;

  &:hover {
    border: 1px solid var(--color-grey-400);
    color: var(--color-grey-700);
  }

  &.${elIntentPrimary} {
    background-image: linear-gradient(to right, var(--intent-primary), var(--intent-primary));
    color: var(--color-white);
    outline-color: var(--intent-primary-dark);
    border: 1px solid var(--intent-primary);

    &:hover {
      background-image: linear-gradient(to right, var(--intent-primary-dark), var(--intent-primary-dark));
      border: 1px solid var(--intent-primary-dark);
      color: var(--color-white);
    }
  }

  &.${elIntentDanger} {
    background-image: linear-gradient(to right, var(--intent-danger), var(--intent-danger));
    color: var(--color-white);
    outline-color: var(--intent-danger-dark);
    border: 1px solid var(--intent-danger);

    &:hover {
      background-image: linear-gradient(to right, var(--intent-danger-dark), var(--intent-danger-dark));
      border: 1px solid var(--intent-danger-dark);
      color: var(--color-white);
    }
  }

  &.${elButtonIconOnly} {
    padding: 0.5rem;
    width: 2.25rem;
  }

  &.${elButtonSizeSmall} {
    height: 2rem;
    padding: 0.375rem 0.875rem;

    &.${elButtonIconOnly} {
      padding: 0.375rem;
      width: 2rem;
    }
  }

  &.${elButtonSizeMedium} {
    height: 2.25rem;
    padding: 0.5rem 1rem;

    &.${elButtonIconOnly} {
      padding: 0.5rem;
      width: 2.25rem;
    }
  }

  &.${elButtonSizeLarge} {
    font-size: var(--font-size-default);
    height: 2.5rem;
    padding: 0.5rem 1rem;

    &.${elButtonIconOnly} {
      padding: 0.5rem;
    }
  }

  &.${elIntentDanger}, &.${elIntentPrimary} {
    ${ElIcon} {
      color: var(--color-white);
    }
  }

  &[disabled],
  &.${elIsLoading},
    &[disabled].${elIntentDanger},
    &[disabled].${elIntentPrimary},
    &[disabled].${elIntentDefault},
    &.${elIsLoading}
    .${elIntentDanger},
    &.${elIsLoading}
    .${elIntentPrimary},
    &.${elIsLoading}
    .${elIntentDefault} {
    border: 1px solid var(--color-grey-100);
    color: var(--color-grey-400);
    background-image: linear-gradient(to right, var(--color-grey-100), var(--color-grey-100));
    cursor: disabled;
  }

  &.${elIsLoading} {
    ${ElButtonLoader} {
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
    max-height: unset;
    padding: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    ${isMobile} {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0.5rem;
    }

    ${ElIcon} {
      color: var(--color-grey-400);

      &:hover {
        color: var(--color-grey-700);
      }
    }

    &.${elIntentDanger}, &.${elIntentPrimary} {
      ${ElIcon} {
        color: var(--color-white);
      }
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

export const elButtonHasLeftChevron = css``

export const elButtonHasRightChevron = css``

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
  height: fit-content;

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
  }
`
