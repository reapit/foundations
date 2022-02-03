import { css } from '@linaria/core'

export const svg = css`
  height: 100vh;
  * {
    transform-box: fill-box;
  }
`

export const key = css`
  transform: translate(30px);
  transition: all 0.5s ease;
`

export const stars = css`
  opacity: 0;
  transition: all 0.5s ease;
`

export const triangle1 = css`
  transform-origin: center;
  transition: all 0.5s ease;
`

export const triangle2 = css`
  transform-origin: center;
  transition: all 0.5s ease;
`

export const triangle3 = css`
  transform-origin: center;
  transition: all 0.5s ease;
`

export const animationStep1 = css`
`

export const animationStep2 = css`
.${key} {
    transform: translate(0px);
  }
  
  .${stars} {
    opacity: 1;
  }
`

export const animationStep3 = css`
  .${key} {
    transform: translate(0px);
  }

  .${stars} {
    opacity: 1;
  }

  .${triangle1} {
    transform: rotate(30deg);
  }

  .${triangle2} {
    transform: rotate(-20deg);
  }

  .${triangle3} {
    transform: rotate(15deg);
  }
`
