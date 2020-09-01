import { css } from 'linaria'
import { forMobileOnly } from '@/core/__styles__/screen-size'

export const listCategories = css`
  ${forMobileOnly} {
    display: flex;
    flex-wrap: wrap;
  }
`
