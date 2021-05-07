import { css } from 'linaria'
import { styled } from 'linaria/react'

export const MapContainer = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: calc(100% - 15.6rem);
  top: 15.6rem;

  @media (min-width: 769px) {
    top: 0;
    height: 100%;
    left: calc(390px + 4.6rem);
    width: calc(100vw - 29rem);
  }
`
export const ControlsContainer = styled.div`
  position: absolute;
  top: 4rem;
  background: #fff;
  width: 100%;
  z-index: 2;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;

  @media (min-width: 769px) {
    width: 25rem;
    left: 4.1rem;
    top: 0;
  }
`

export const AppoinmentContainer = styled.div`
  padding: 1.5rem 1.5rem;
  position: absolute;
  background: #f5f7f9;
  height: calc(100% - 15.6rem);
  left: 0;
  top: 15.6rem;
  width: 100%;
  overflow: scroll;
  z-index: 1;

  @media (min-width: 769px) {
    width: 25rem;
    left: 4.1rem;
    top: 11.6rem;
    height: calc(100% - 11.6rem);
  }
`

export const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  vertical-align: middle;
  justify-content: center;
`

export const buttonPaddingSmall = css`
  padding-left: 0.7rem !important;
  padding-right: 0.7rem !important;
`

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
