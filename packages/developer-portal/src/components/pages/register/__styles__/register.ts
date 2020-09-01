import { css } from 'linaria'
import { white } from '@/core/__styles__/colors'
import { forTabletAndBelow } from '@/core/__styles__/media'

export const container = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  background-color: ${white};

  ${forTabletAndBelow} {
    flex-direction: column-reverse;
  }
`

export const wrapper = css`
  background-color: ${white};
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

  button.button,
  .tabsContainer {
    margin: 0 auto 2rem auto;
    max-width: 400px;
  }

  ${forTabletAndBelow} {
    width: 100%;
  }
`

export const image = css`
  background-color: ${white};
  width: 66.66%;
  height: 100vh;
  font-size: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${forTabletAndBelow} {
    width: 100%;
    height: 300px;
  }
`
