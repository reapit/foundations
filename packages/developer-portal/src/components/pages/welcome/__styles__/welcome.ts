import { css } from 'linaria'
import { forTabletOnly } from '@/core/__styles__/media'

export const content = css`
  ${forTabletOnly} {
    max-width: 375px;
  }
`
