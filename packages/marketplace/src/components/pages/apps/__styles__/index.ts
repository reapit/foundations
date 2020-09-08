import { css } from 'linaria'

export const appList = css`
  width: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: -1rem;
  padding: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`
