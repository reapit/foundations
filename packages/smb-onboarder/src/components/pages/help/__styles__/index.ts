import { css } from 'linaria'

export const getStartedContainer = css`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 769px) {
    width: unset;
  }
`

export const stepContainer = css`
  @media (min-width: 769px) {
    max-width: 500px;
  }
`
