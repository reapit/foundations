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

export const imageContainer = css`
  background-color: ${white};
  width: 60%;
  height: 100vh;
  font-size: 0;

  ${forMobileOnly} {
    display: none;
  }
`
