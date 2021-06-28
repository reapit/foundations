import { css } from '@linaria/core'

export const elFadeIn = css`
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 0.2s;
  animation-name: fade-in;
`
