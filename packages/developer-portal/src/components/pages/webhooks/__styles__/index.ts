import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const IconContainer = styled.div`
  position: relative;
  height: 140px;
`

export const iconFadeIn = css`
  @keyframes icon-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 0.1s;
  animation-name: icon-fade-in;
  position: absolute;
`

export const iconFadeOut = css`
  @keyframes icon-fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 0.1s;
  animation-name: icon-fade-out;
  position: absolute;
`

export const StepContentContainer = styled.div`
  min-height: 400px;
`

export const gridControlsMinHeight = css`
  min-height: 2.5rem;
`

export const searchMinWidth = css`
  min-width: 210px;
`

export const ControlsContainer = styled.div`
  padding: 0.75rem 0.5rem;
  background-color: #fff;
`

export const inputFullWidth = css`
  input {
    width: 100%;
  }
`

export const overflowHidden = css`
  overflow: hidden;
`
