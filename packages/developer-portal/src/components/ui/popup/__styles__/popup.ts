import { css } from 'linaria'
import { forTabletAndDesktop } from '@/core/__styles__/media'

const navWidth = '80px'

export const wrapPopup = css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  transform: unset;

  button {
    white-space: normal;
  }

  ${forTabletAndDesktop} {
    transform: translateX(${navWidth}); // 66px being the width of the sidebar
    width: calc(100vw - ${navWidth});
  }

  &-desktop {
    ${forTabletAndDesktop} {
      transform: none;
    }
  }
`
