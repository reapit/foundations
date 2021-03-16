import { css } from 'linaria'

export const loginContainer = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background-color: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

export const wrapper = css`
  background-color: #fff;
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

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 3rem;
  }
`

export const imageContainer = css`
  background-color: #fff;
  width: 60%;
  height: 100vh;
  font-size: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const loginLevel = css`
  flex-direction: column;
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
      background-image: url('../../../assets/images/login/step-1.svg');
    }

    50% {
      background-image: url('../../../assets/images/login/step-2.svg');
    }

    to {
      background-image: url('../../../assets/images/login/step-3.svg');
    }
  }
`
