import { css } from 'linaria'
import { styled } from 'linaria/react'
import { isDesktop, isTablet } from '../../../../core/__styles__/media'

export const appointmentListWidthDesktop = '23rem'
const appointmentTimeontainerHeight = '3.5rem'
const controlsHeightDesktop = '8.31rem'
const navControlsHeightMobile = '11.75rem'
const navHeightMobile = '3.5rem'
const navAppointmentListWidthDesktop = '28rem'
const navWidthDesktop = '5rem'
const mapPanelHeight = '5rem'
const controlsContainerMobileHasMapPanel = '10.5rem'

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

export const mapPanelContainerExpanded = css``

export const MapPanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: ${navAppointmentListWidthDesktop};
  display: flex;
  background-color: #fff;
  padding: 0 1rem;
  align-items: center;
  height: 0;
  width: calc(100vw - ${navAppointmentListWidthDesktop});
  left: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s linear;
  overflow: hidden;
  opacity: 0;

  ${isTablet} {
    width: calc(100vw - ${navAppointmentListWidthDesktop});
  }

  ${isDesktop} {
    justify-content: flex-start;
  }

  &.${mapPanelContainerExpanded} {
    height: ${mapPanelHeight};
    padding: 1rem;
    opacity: 1;
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
  height: calc(100% - ${navControlsHeightMobile} - ${appointmentTimeontainerHeight});
  left: 0;
  top: calc(${navControlsHeightMobile} + ${appointmentTimeontainerHeight});
  width: 100%;
  overflow: scroll;
  z-index: 1;

  ${isTablet} {
    width: ${appointmentListWidthDesktop};
    left: ${navWidthDesktop};
    top: calc(${controlsHeightDesktop} + ${appointmentTimeontainerHeight});
    height: calc(100% - ${controlsHeightDesktop} - ${appointmentTimeontainerHeight});
  }
`

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
    height: ${appointmentTimeontainerHeight};
    padding: 1.25rem 1.5rem 0 1.5rem;
    opacity: 1;
  }
`

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  vertical-align: middle;
  justify-content: center;
`
