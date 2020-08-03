import { css } from 'linaria'

export const gridItem = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding-left: 1em;
  padding-right: 1em;

  @media screen and (min-width: 768px) {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
`

export const hasBackgroundSection = css`
  > * {
    color: white;
  }
`
