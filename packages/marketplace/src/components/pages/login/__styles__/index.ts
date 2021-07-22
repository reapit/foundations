import { css } from '@linaria/core'
import * as colors from '@/core/__styles__/colors'
import { forMobileOnly } from '../../../../core/__styles__/screen-size'
import { white } from '@/core/__styles__/colors'

export const container = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.white};

  ${forMobileOnly} {
    flex-direction: column-reverse;
  }
`

export const wrapper = css`
  background-color: ${colors.white};
  width: 40%;
  padding: 2rem;
  pointer-events: auto;

  &.disabled {
    pointer-events: none;
  }

  h1,
  p,
  img {
    text-align: center;
  }

  img {
    margin: 0 auto;
    max-width: 200px;
    display: block;
  }

  button,
  .tabsContainer {
    margin: 0 auto 2rem auto;
    max-width: 400px;
  }

  ${forMobileOnly} {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 3rem;
  }
`

export const imageContainer = css`
  background-color: ${white};
  width: 60%;
  height: 100vh;
  font-size: 0;

  ${forMobileOnly} {
    display: none;
  }
`

export const registerLevel = css`
  flex-direction: column;
`

export const register = css`
  max-width: 400px;
  width: 100%;
  text-align: right;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding-top: 1rem;
  }

  @media screen and (min-width: 900px) {
    padding-left: 1rem;
  }

  @media screen and (min-width: 960px) {
    padding: 0;
  }
`

export const loginForm = css`
  position: relative;
  .forgotPasswordContainer {
    position: absolute;
    right: 0;
    z-index: 1;
  }
`

export const labelTerms = css`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`

export const loginButton = css`
  margin-right: auto;
  margin-left: auto;
`

export const loginImageVisible = css``

export const loginImage = css`
  transition: opacity 1s ease-in-out;
  position: absolute;
  height: 100%;
  opacity: 0;
  z-index: 1;

  &.${loginImageVisible} {
    opacity: 1;
  }
`

export const loginImages = css`
  height: 100%;
  width: auto;
  position: relative;
`
