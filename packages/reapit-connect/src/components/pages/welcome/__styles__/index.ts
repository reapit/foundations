import { css } from '@linaria/core'

export const logoWrapStyle = css`
  text-align: center;
  @media screen and (min-width: 768px) {
    text-align: left;
    margin-left: 2em;
  }
`

export const logoStyle = css`
  width: 8em;
`

export const buttonStyle = css`
  border-color: transparent;
  color: white;
  min-width: 200px;
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  align-self: flex-start;
  text-align: center;

  @media screen and (max-width: 768px) {
    align-self: stretch;
    padding-top: 1em;
    padding-bottom: 1em;

  }

  &:active {
    color: white;
  }
  &:focus {
    color: white;
    box-shadow: none;
  }
  &:hover {
    color: white;
    border-color: transparent;
  }
`

export const developerPortalButton = css`
  background-color: #1e2454;
  &:hover {
    background-color: #0e112a;
  }
`

export const marketplaceButton = css`
  background-color: #209bd4;
  border-color: transparent;
  &:hover {
    background-color: #0f4d6a;
  }
`
