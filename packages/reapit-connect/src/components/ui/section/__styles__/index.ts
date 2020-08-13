import { css } from 'linaria'

export const sectionContainer = css`
  @media screen and (min-width: 768px) {
    height: 400px;
  }
`

export const gridItem = css`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;

  @media screen and (min-width: 768px) {
    padding-left: 2.5em;
    padding-right: 2.5em;
    > img {
      height: 100%;
      width: auto;
    }
  }
`

export const hasBackgroundSection = css`
  > * {
    color: white;
  }
`
