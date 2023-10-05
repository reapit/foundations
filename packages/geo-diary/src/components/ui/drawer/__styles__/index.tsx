import { css } from '@linaria/core'
import * as sizes from '../../../../core/__styles__/sizes'
import * as colors from '../../../../core/__styles__/colors'
import { appointmentListWidthDesktop } from '../../../../core/__styles__/page-layout-variables'

export const drawerBg = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  transition: 0.35s;

  @media (min-width: 769px) {
    width: ${appointmentListWidthDesktop};
  }
`
export const drawerBgOpen = css`
  background-color: rgba(100, 100, 100, 0.2);
  z-index: 3;
`
export const drawer = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  max-height: 100%;
  overflow: scroll;
  background: white;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  padding-bottom: ${sizes.paddingLarge};
  transition: 0.35s;
  opacity: 0;
  transform: translateY(100%);
  z-index: -2;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 769px) {
    width: ${appointmentListWidthDesktop};
  }
`
export const drawerOpen = css`
  z-index: 4;
  transform: translateY(0);
  opacity: 1;
`
export const drawerBody = css`
  padding: ${sizes.paddingLarge};
  padding-top: 0;
`
export const drawerHeader = css`
  margin-bottom: ${sizes.marginLarge};
  padding: ${sizes.paddingLarge};
  border-bottom: 1px solid ${colors.black20};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const drawerFooter = css`
  margin: ${sizes.marginLarge};
`
