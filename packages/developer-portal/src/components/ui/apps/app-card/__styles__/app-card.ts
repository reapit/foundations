import { css } from 'linaria'

export const appSummary = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.1rem;
`
