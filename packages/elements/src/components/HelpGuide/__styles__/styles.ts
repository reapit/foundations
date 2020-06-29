import { css } from 'linaria'

export const helpGuildeContent = css`
  padding: 3rem 0;
  @media (min-width: 769px) {
    min-width: 85%;
  }
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
export const helpGuideImage = css`
  max-width: 31rem;
  & > img {
    max-width: 100%;
    height: auto;
  }
`

export const helpGuide = css`
  flex-grow: 0 !important;
  width: 80% !important;
  @media (max-width: 769px) {
    width: 100% !important;
    min-height: 50% !important;
  }
`
