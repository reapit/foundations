import { css } from '@linaria/core'
import * as colors from '../../../../core/__styles__/colors'
import { iconContainer } from '../../icon/__styles__'

export const iconButtonContainer = css`
  border: none;
  background: #fff;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :active {
    box-shadow: 0px 0px 15px 0px inset ${colors.black20};
  }

  ${iconContainer} {
    color: var(--color-grey-500);
    font-size: 1.375rem;
  }
`

export const darkModeButton = css`
  background: #000;
`

export const disabledButton = css`
  opacity: 0.4;
`

export const smallButton = css`
  width: 2rem;
  height: 2rem;

  ${iconContainer} {
    font-size: 0.75rem;
  }
`

export const mediumButton = css`
  width: 2.3rem;
  height: 2.3rem;

  ${iconContainer} {
    font-size: 1.1rem;
  }
`
