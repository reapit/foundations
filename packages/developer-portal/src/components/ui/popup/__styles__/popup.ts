import { css } from 'linaria'
import { forTabletAndDesktop } from '@/core/__styles__/media'

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
    transform: translateX(66px); // 66px being the width of the sidebar
    width: calc(100vw - 66px);
  }

  &-desktop {
    ${forTabletAndDesktop} {
      transform: none;
    }
  }
`
