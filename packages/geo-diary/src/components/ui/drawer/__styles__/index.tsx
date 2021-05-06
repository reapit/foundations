import { css } from 'linaria'
import * as sizes from '../../../../core/__styles__/sizes'
import * as colors from '../../../../core/__styles__/colors'

export const drawerBg = css`
  background: ${colors.black20};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;
  transition: 0.35s;
`
export const drawerBgOpen = css`
  opacity: 1;
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
  border-radius: ${sizes.borderRadius} ${sizes.borderRadius} 0 0;
  box-shadow: 0 0 8px 0 ${colors.black40};
  padding-bottom: ${sizes.paddingLarge};

  transition: 0.35s;
  opacity: 0;
  transform: translateY(100%);
  z-index: -2;
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
export const drawerHeaderTitle = css`
  font-size: ${sizes.textNormal};
  margin: 0;
`
export const drawerFooter = css`
  margin: ${sizes.marginLarge};
`
