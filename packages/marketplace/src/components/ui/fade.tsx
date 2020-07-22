import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import { css } from 'linaria'

export const fadeContainer = css`
  .fade-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`

export const FADE_TIMEOUT = 1000

export type FadeProps = {
  in: boolean
  timeout?: number
  children: React.ReactNode[] | React.ReactNode
} & CSSTransitionProps

export const Fade: React.FC<FadeProps> = (props: FadeProps) => {
  const nodeRef = React.useRef(null)
  return (
    <div className={fadeContainer}>
      <CSSTransition classNames="fade" {...props} nodeRef={nodeRef}>
        <div ref={nodeRef}>{props.children}</div>
      </CSSTransition>
    </div>
  )
}
const defaultProps = {
  in: false,
  timeout: FADE_TIMEOUT,
}

Fade.defaultProps = defaultProps

export default Fade
