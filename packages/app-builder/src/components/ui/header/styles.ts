import { css } from '@linaria/core'

export const header = css`
  background: #fff;
  /* height: 52px; */
  padding-top: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e3e3e3;
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
