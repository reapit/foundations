import { css } from 'linaria'

export const container = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background-color: #fff;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`

export const wrapper = css`
  background-color: #fff;
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

  div > img {
    margin: 0 auto;
    max-width: 200px;
    display: block;
  }

  button {
    margin: 0 auto;
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
  background-color: #fff;
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
