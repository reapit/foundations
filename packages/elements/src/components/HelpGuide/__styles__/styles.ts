import { css } from 'linaria'

export const helpGuildeContent = css`
  padding: 3rem 0;
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
  flex-grow: 0;
  width: 80%;
  @media (max-width: 769px) {
    width: 100%;
    min-height: 50%;
  }
`
