import { css } from 'linaria'
import { bluePrimaryMedium } from '@/core/__styles__/colors'

export const link = css`
  color: ${bluePrimaryMedium};
  font-weight: bold;
`
export const hyperlinked = css`
  color: ${bluePrimaryMedium};
  text-decoration: underline;
  font-weight: bold;
`
export const linkNormal = css`
  font-weight: normal;
`
