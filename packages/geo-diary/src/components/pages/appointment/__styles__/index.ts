import { css } from 'linaria'
import { styled } from 'linaria/react'
import { isTablet } from '../../../../core/__styles__/media'
import {
  appointmentListWidthDesktop,
  appointmentTimeContainerHeight,
  controlsHeightDesktop,
  navAppointmentListWidthDesktop,
  navControlsHeightMobile,
  navHeightMobile,
  navWidthDesktop,
} from '../../../../core/__styles__/page-layout-variables'

export const mobileAppointmentsHidden = css`
  transform: translate3d(0%, 0, 0);
  animation: slide-out 0.35s forwards;

  @keyframes slide-out {
    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
`

export const mobileAppointmentsShow = css`
  transform: translate3d(-100%, 0, 0);
  animation: slide-in 0.35s forwards;

  @keyframes slide-in {
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`

export const ControlsContainer = styled.div`
  position: absolute;
  top: ${navHeightMobile};
  background: #fff;
  width: 100%;
  z-index: 2;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 1.5rem 0.875rem 1.5rem;
  display: flex;
  flex-direction: column;

  ${isTablet} {
    width: ${appointmentListWidthDesktop};
    left: 5rem;
    top: 0;
  }
`

export const ControlsTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AppoinmentContainer = styled.div`
  padding: 0 1.5rem;
  position: absolute;
  background-color: var(--color-grey-light);
  height: calc(100% - ${navControlsHeightMobile} - ${appointmentTimeContainerHeight});
  left: 0;
  top: calc(${navControlsHeightMobile} + ${appointmentTimeContainerHeight});
  width: 100%;
  overflow: scroll;
  z-index: 1;

  ${isTablet} {
    width: ${appointmentListWidthDesktop};
    left: ${navWidthDesktop};
    top: calc(${controlsHeightDesktop} + ${appointmentTimeContainerHeight});
    height: calc(100% - ${controlsHeightDesktop} - ${appointmentTimeContainerHeight});
  }
`

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  vertical-align: middle;
  justify-content: center;
`

export const MapContainer = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;

  ${isTablet} {
    left: ${navAppointmentListWidthDesktop};
    width: calc(100vw - ${navAppointmentListWidthDesktop});
  }
`
