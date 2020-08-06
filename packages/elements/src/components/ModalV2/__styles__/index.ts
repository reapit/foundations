import { css } from 'linaria'

export const modalContainer = css`
  .rc-dialog-content {
    border-radius: 0px;
  }
  .rc-dialog-header {
    background-color: #f5f5f5;
    border-radius: 0px;
  }
  .rc-dialog-footer {
    background-color: #f5f5f5;
    border-radius: 0px;
  }
  .rc-dialog-close {
    opacity: 1;
    top: 30px;
  }
  .rc-dialog-close:focus {
    outline: none;
  }
`
export const modalCentered = css`
  display: flex;
  align-items: center;
  justify-content: center;
`
// same styles as our .container class
export const modalResponsiveContainer = css`
  @media screen and (min-width: 1024px) {
    width: 960px;
  }

  @media screen and (min-width: 1216px) {
    width: 1152px;
  }

  @media screen and (min-width: 1408px) {
    width: 1344px;
  }
`

export const modalNoPadding = css`
  .rc-dialog-body {
    padding: 0;
  }
`

export const modalNoHeader = css`
  .rc-dialog-header,
  .rc-dialog-close {
    display: none;
  }
`
