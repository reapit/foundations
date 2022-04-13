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
  width: 55%;
  height: 100vh;
  font-size: 0;
  max-width: 700px;

  ${forMobileOnly} {
    display: none;
  }
`
