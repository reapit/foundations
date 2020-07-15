import { css } from 'linaria'
import { colors } from '@/styles/colors'
import { layoutSizes } from '@/styles/layout'
import { fontSizes } from '@/styles/fonts'

export const copyClipboardWrapper = css`
  position: relative;
  font-size: ${fontSizes.default};
  background: ${colors.greyLightest};

  p {
    font-style: italic;
    color: ${colors.grey};
    background: ${colors.greyLightest};
  }

  svg {
    color: ${colors.grey};
    position: absolute;
    right: ${layoutSizes.base};
    cursor: pointer;
  }
`
