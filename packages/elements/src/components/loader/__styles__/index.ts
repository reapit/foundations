import { styled } from '@linaria/react'
import { elIsFullPage } from '../../../styles/states'

const ANIM_TIME = 1.2

export const ElLoaderContainer = styled.div`
  display: flex;
  align-items: center;

  &.${elIsFullPage} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
  }
`

export const ElLoaderLabel = styled.p`
  margin-right: 0.75rem;
  font-size: var(--font-size-default);
  color: var(--color-grey-500);
`

export const ElLoader = styled.div`
  position: relative;
  background: var(--color-grey-100);
  height: 3px;
  width: 80px;
`

export const ElLoaderMovingBar = styled.div`
  position: absolute;
  height: 100%;
  width: 0;
  background: var(--color-purple-500);
  animation: moveDarkBlueBar ${ANIM_TIME}s infinite linear;
  z-index: 3;

  @keyframes moveDarkBlueBar {
    0% {
      width: 0;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`
