import { css } from '@linaria/core'

export const header = css`
  background: #fff;
  height: 45px;
  border-bottom: 1px solid #e3e3e3;
`

export const item = css`
  margin-right: 10px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
`

export const disabled = css`
  opacity: 0.5;
  cursor: not-allowed;
`

export const buttonIcon = css`
  display: inline;

  svg {
    fill: white;
    width: 21px;
    height: 21px;
    display: inline;
    margin-right: 9px;
    margin-bottom: -4px;
  }
`
