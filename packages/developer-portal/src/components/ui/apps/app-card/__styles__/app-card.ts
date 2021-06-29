import { css } from '@linaria/core'

export const appSummary = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3.65rem;
`

export const appTitle = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.6em;
`
