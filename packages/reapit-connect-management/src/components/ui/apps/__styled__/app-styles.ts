import { css } from 'linaria'

export const installString = css`
  display: flex;
  align-items: center;
  color: #74818d;

  svg {
    margin-right: 0.5rem;
  }
`

export const installed = css`
  svg {
    color: #a0c862;
  }
`

export const uninstalled = css`
  svg {
    color: #d3033d;
  }
`
