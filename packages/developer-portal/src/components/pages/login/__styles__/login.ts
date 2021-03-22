import { css } from 'linaria'
import { white } from '@/core/__styles__/colors'
import { forMobileOnly } from '@/core/__styles__/media'

export const container = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
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

export const loginImage = css`
  height: 100%;
  width: auto;
  background-repeat: no-repeat;
  background-size: contain;
  animation-duration: 3s;
  animation-name: image;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  @keyframes image {
    from {
      background-image: url('../../../../assets/images/login/step-1.svg');
    }

    50% {
      background-image: url('../../../../assets/images/login/step-2.svg');
    }

    to {
      background-image: url('../../../../assets/images/login/step-3.svg');
    }
  }
`
