import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isTablet } from '../../../../core/__styles__/media'
import {
  appointmentListWidthDesktop,
  appointmentTimeContainerHeight,
  controlsHeightDesktop,
  navControlsHeightMobile,
} from '../../../../core/__styles__/page-layout-variables'

export const appointmentTimeContainerExpanded = css``

export const AppointmentTimeContainer = styled.div`
  height: 0;
  position: sticky;
  top: ${navControlsHeightMobile};
  padding: 0 1.5rem 0 1.5rem;
  background-color: var(--color-grey-light);
  width: 100%;
  overflow: hidden;
  transition: opacity 0.2s linear;
  opacity: 0;
  z-index: 1;

  ${isTablet} {
    top: ${controlsHeightDesktop};
    width: ${appointmentListWidthDesktop};
    z-index: 0;
  }

  &.${appointmentTimeContainerExpanded} {
    height: ${appointmentTimeContainerHeight};
    padding: 1.25rem 1.5rem 0 1.5rem;
    opacity: 1;
  }
`
