import { styled } from 'linaria/react'
import { elIsFullPage } from '../../../styles-v3/base/states'

export const ElLoaderContainer = styled.div`
  display: flex;
  align-items: center;

  &${elIsFullPage} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
  }
`

export const ElLoaderLabel = styled.p`
  margin-right: 0.75rem;
`

export const ElLoader = styled.div`
  position: relative;
  background: var(--color-grey-medium);
  height: 3px;
  width: 80px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    background: var(--color-blue-light);
    width: 62.5%;
    height: 100%;
    animation: moveLightBlueBar 0.85s infinite linear;
    z-index: 1;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    background: var(--color-accent-orange);
    width: 50%;
    height: 100%;
    animation: moveYellowBar 0.85s infinite linear;
    z-index: 2;
  }

  @keyframes moveLightBlueBar {
    0% {
      left: 0;
    }
    50% {
      left: 10%;
    }
    100% {
      left: 0;
    }
  }

  @keyframes moveYellowBar {
    0% {
      left: 0;
    }
    50% {
      left: 20%;
    }
    100% {
      left: 0;
    }
  }
`

export const ElLoaderMovingBar = styled.div`
  position: absolute;
  height: 100%;
  width: 22.5%;
  background: var(--color-blue-dark);
  animation: moveDarkBlueBar 0.85s infinite linear;
  z-index: 3;

  @keyframes moveDarkBlueBar {
    0% {
      left: 0;
    }
    50% {
      left: 77.5%;
    }
    100% {
      left: 0;
    }
  }
`
