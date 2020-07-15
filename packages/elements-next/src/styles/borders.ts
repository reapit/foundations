import { css } from 'linaria'
import { colors } from './colors'

// Convenience classes to add standard 1px grey border

export const elBT = css`
  border-top: 1px solid ${colors.greyLight};
`

export const elBB = css`
  border-bottom: 1px solid ${colors.greyLight};
`

export const elBL = css`
  border-left: 1px solid ${colors.greyLight};
`

export const elBR = css`
  border-right: 1px solid ${colors.greyLight};
`

export const elBA = css`
  border: 1px solid ${colors.greyLight};
`

export const elBX = css`
  border-left: 1px solid ${colors.greyLight};
  border-right: 1px solid ${colors.greyLight};
`

export const elBY = css`
  border-top: 1px solid ${colors.greyLight};
  border-bottom: 1px solid ${colors.greyLight};
`
