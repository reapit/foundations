import { css } from 'linaria'

export const fadeStyle = css`
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
