import { css } from 'linaria'

export const elProgress = css`
  position: relative;
  height: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  background: var(--color-white, #ffffff);
  border: 1px solid var(--color-teal, #006580);
  color: var(--color-teal, #006580);

  &::-webkit-progress-bar {
    background: var(--color-white, #ffffff);
    width: 100%;
  }
  &::-webkit-progress-value {
    background: var(--color-teal, #006580);
  }
  &::-moz-progress-bar {
    background: var(--color-teal, #006580);
  }
`
