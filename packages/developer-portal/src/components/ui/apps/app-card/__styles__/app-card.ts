// import { black } from '@reapit/elements/src/styles'
import { css } from 'linaria'
import { black } from '@/core/__styles__/colors'

export const appSummary = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 72px;
`
export const directAPI = css`
  color: ${black};
  font-weight: 400;
  margin-left: 5px;
  white-space: nowrap;
`
