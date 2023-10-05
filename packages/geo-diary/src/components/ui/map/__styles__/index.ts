import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isTablet } from '../../../../core/__styles__/media'

export const mapContainerHasMapPanel = css``

export const MapContentContainer = styled.div`
  height: calc(100% - 10rem);
  top: 10rem;
  transition: height 0.2s linear;
  position: absolute;
  width: 100%;

  &.${mapContainerHasMapPanel} {
    height: calc(100% - 17.2rem);
    top: 12.2rem;
  }

  ${isTablet} {
    top: 0;
    height: 100%;

    &.${mapContainerHasMapPanel} {
      top: 0;
      height: calc(100% - 5rem);
    }
  }
`
