import { css } from '@linaria/core'

export const container = css`
  position: relative;
  height: 100vh;
`

export const background = css`
  height: 100vh;
  img {
    height: 100%;
    max-height: 100%;
    min-height: 100%;
  }
`

export const keyActive = css``

export const key = css`
  position: absolute;
  top: -10%;
  left: 50%;
  width: 12rem;
  transition: left 0.5s ease;

  &.${keyActive} {
    left: 30%;
  }
`

export const starActive = css``

export const star = css`
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.${starActive} {
    opacity: 1;
  }

  &:nth-child(2) {
    top: -50%;
    right: -10%;
    transform: scale(80%);
    -webkit-transform: scale(.8, .8);
  }

  &:nth-child(3) {
    top: -10%;
    right: -20%;
    transform: scale(40%);
    -webkit-transform: scale(.4, .4);
  }

  &:nth-child(4) {
    bottom: -30%;
    right: -5%;
    transform: scale(50%);
    -webkit-transform: scale(.5, .5);
  }
`

export const keyholeContainer = css`
  position: absolute;
  top: 40%;
  left: 5%;
`

export const keyhole = css``

export const keyholeMask = css`
  width: 2.5rem;
  height: 3.5rem;
  background: #262f68;
  position: absolute;
  top: 15%;
  left: 10%;
  z-index: 300;
`

export const triangleActive = css``

export const triangle1 = css`
  position: absolute;
  top: 65%;
  left: 20%;
  border: 1rem solid transparent;
  border-top-color: var(--color-dark-blue);
  border-right-width: 1.25rem;
  transform: rotate(60deg);
  transition: transform 2s ease;

  &.${triangleActive} {
    transform: rotate(90deg);
  }
`

export const triangle2 = css`
  position: absolute;
  top: 72.5%;
  left: 12.5%;
  border: 3rem solid transparent;
  border-top-color: var(--intent-primary);
  border-top-width: 2rem;
  border-left-width: 2rem;
  transform: rotate(80deg);
  transition: transform 2s ease;

  &.${triangleActive} {
    transform: rotate(60deg);
  }
`

export const triangle3 = css`
  position: absolute;
  top: 85%;
  left: 22.5%;
  border: 3.5rem solid transparent;
  border-right-width: 2.5rem;
  border-top-color: var(--intent-secondary);
  transform: rotate(-20deg);
  transition: transform 2s ease;

  &.${triangleActive} {
    transform: rotate(-10deg);
  }
`
