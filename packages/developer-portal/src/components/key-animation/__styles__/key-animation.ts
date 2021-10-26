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

export const key = css`
  position: relative;
  top: -10%;
  left: 50%;
  width: 12rem;
`

export const keyhole = css`
  position: absolute;
  top: 40%;
  left: 5%;
`

export const keyholeMask = css`
  width: 2.5rem;
  height: 3.5rem;
  background: #262f69;
  position: absolute;
  top: 15%;
  left: 10%;
`

export const triangle1 = css`
  position: absolute;
  top: 65%;
  left: 22.5%;
  border: 1rem solid transparent;
  border-top-color: #262f69;
  border-right-width: 1.25rem;
  transform: rotate(60deg);
  animation: triangle1 2s linear;
  animation-iteration-count: infinite;
  -webkit-transform-origin: center top;
  -moz-transform-origin: center top;
  -ms-transform-origin: center top;
  -o-transform-origin: center top;
  transform-origin: center top;

  @keyframes triangle1 {
    33% {
      transform: rotate(90deg);
    }
    66% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(60deg);
    }
  }
`

export const triangle2 = css`
  position: absolute;
  top: 75%;
  left: 17.5%;
  border: 3rem solid transparent;
  border-top-color: #0061a8;
  border-top-width: 2rem;
  border-left-width: 2rem;
  transform: rotate(80deg);
  animation: triangle2 2.5s linear;
  animation-iteration-count: infinite;
  -webkit-transform-origin: center top;
  -moz-transform-origin: center top;
  -ms-transform-origin: center top;
  -o-transform-origin: center top;
  transform-origin: center top;

  @keyframes triangle2 {
    33% {
      transform: rotate(65deg);
    }
    66% {
      transform: rotate(70deg);
    }
    100% {
      transform: rotate(80deg);
    }
  }
`

export const triangle3 = css`
  position: absolute;
  top: 85%;
  left: 20%;
  border: 3.5rem solid transparent;
  border-left-width: 2.5rem;
  border-top-color: #23a4de;
  transform: rotate(20deg);
  animation: triangle3 3s linear;
  animation-iteration-count: infinite;
  -webkit-transform-origin: center top;
  -moz-transform-origin: center top;
  -ms-transform-origin: center top;
  -o-transform-origin: center top;
  transform-origin: center top;

  @keyframes triangle3 {
    33% {
      transform: rotate(40deg);
    }
    66% {
      transform: rotate(35deg);
    }
    100% {
      transform: rotate(20deg);
    }
  }
`
