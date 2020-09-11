import { css } from 'linaria'
import { colors } from '@/styles/colors'
import { layoutSizes } from '@/styles/layout'

export const copyClipboardWrapper = css`
  position: relative;
  p {
    font-style: italic;
  }

  svg {
    color: ${colors.grey};
    position: absolute;
    right: ${layoutSizes.base};
    cursor: pointer;
  }
`
