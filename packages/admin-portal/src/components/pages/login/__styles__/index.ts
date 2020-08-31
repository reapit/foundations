import { css } from 'linaria'
import { WHITE } from '../../../../core/__styles__'

export const loginContainer = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background-color: ${WHITE};

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`

export const wrapper = css`
  background-color: ${WHITE};
  width: 33.33%;
  padding: 1rem;
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

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 3rem;
  }
`

export const image = css`
  background-color: ${WHITE};
  width: 66.66%;
  height: 100vh;
  font-size: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 300px;
  }
`

export const loginLevel = css`
  flex-direction: column;
`
