import { css } from 'linaria'

export const sectionContainer = css`
  @media screen and (min-width: 768px) {
    height: 330px;
  }

  h2 {
    font-weight: 400;
  }

  font-weight: 700;

  &:nth-child(odd) {
    flex-direction: row-reverse;
  }

  &:nth-child(even) {
    flex-direction: row;
  }
`

export const gridItem = css`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  > img {
    max-height: 100%;
  }

  @media screen and (min-width: 768px) {
    padding-left: 2.5em;
    padding-right: 2.5em;
  }
`

export const hasBackgroundSection = css`
  > * {
    color: white;
  }
`
