import { css } from 'linaria'

export const hideWhenInDesktop = css`
  @media (min-width: 769px) {
    display: none;
  }
`
