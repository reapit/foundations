import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isTablet } from '../../../../core/__styles__/media'

import {
  controlsContainerMobileHasMapPanel,
  mapPanelHeight,
  navControlsHeightMobile,
  navHeightMobile,
} from '../../../../core/__styles__/page-layout-variables'

export const mapContainerHasMapPanel = css``

export const MapContentContainer = styled.div`
  height: calc(100% - ${navControlsHeightMobile});
  top: ${navControlsHeightMobile};
  transition: height 0.2s linear;
  position: absolute;
  width: 100%;

  &.${mapContainerHasMapPanel} {
    height: calc(100% - ${mapPanelHeight} - ${controlsContainerMobileHasMapPanel} - ${navHeightMobile});
    top: calc(${controlsContainerMobileHasMapPanel} + ${navHeightMobile});
  }

  ${isTablet} {
    top: 0;
    height: 100%;

    &.${mapContainerHasMapPanel} {
      top: 0;
      height: calc(100% - ${mapPanelHeight});
    }
  }
`
