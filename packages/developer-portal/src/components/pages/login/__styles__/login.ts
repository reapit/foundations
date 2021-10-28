import { css } from '@linaria/core'
import { white } from '@/core/__styles__/colors'
import { forMobileOnly } from '@/core/__styles__/media'

export const container = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${white};

  ${forMobileOnly} {
    flex-direction: column-reverse;
  }
`

export const wrapper = css`
  background-color: ${white};
  width: 40%;
  padding: 2rem;
  pointer-events: auto;
  max-width: 600px;

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

  button.button,
  .tabsContainer {
    margin: 0 auto 2rem auto;
    max-width: 400px;
  }

  ${forMobileOnly} {
    width: 100%;
  }
`

export const imageContainer = css`
  background-color: ${white};
  width: 60%;
  height: 100vh;
  font-size: 0;
  max-width: 700px;

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
  text-align: center;
  margin: 0 auto;

  ${forMobileOnly} {
    padding-top: 1rem;
    text-align: center;
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

// Need this to override default without !important
export const loginButton = css`
  .loginButton {
    margin-right: auto;
    margin-left: auto;
  }
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
