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
  overflow: scroll;
  max-height: 100vh;

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

export const loginImageVisible = css``

export const loginImage = css`
  height: 100%;
  width: auto;
  background-repeat: no-repeat;
  background-size: contain;
  animation-duration: 3s;
  animation-name: image;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  transition: opacity 1s ease-in-out;
  position: absolute;
  opacity: 0;
  z-index: 1;

  &.${loginImageVisible} {
    opacity: 1;
  }

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

export const imageContainer = css`
  background-color: ${white};
  width: 55%;
  height: 100vh;
  font-size: 0;

  ${forMobileOnly} {
    display: none;
  }
`
