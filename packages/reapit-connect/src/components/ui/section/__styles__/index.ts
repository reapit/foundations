import { css } from '@linaria/core'

export const sectionContainer = css`
  @media screen and (min-width: 768px) {
    height: 400px;
  }
  display: flex;
  justify-content: space-between;
  padding-left: 2em;
  padding-right: 2em;

  &:nth-child(odd) {
    flex-direction: row-reverse;
  }

  &:nth-child(even) {
    flex-direction: row;
  }
  @media screen and (max-width: 768px) {
    &:nth-child(odd),
    &:nth-child(even) {
      flex-direction: column-reverse;
    }
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

  @media screen and (max-width: 768px) {
    max-height: 240px;
    overflow: hidden;
    margin-bottom: 1.2em;
  }
`

export const sectionContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const hasBackgroundSection = css`
  > * {
    color: white;
  }
`
