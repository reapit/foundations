import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isDesktop, isTablet } from '../../../../core/__styles__/media'
import { mapPanelHeight, navAppointmentListWidthDesktop } from '../../../../core/__styles__/page-layout-variables'

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

export const MapPanelItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0rem;

  &:last-child {
    margin-right: 0;
  }

  h2 {
    margin-bottom: 0.25rem;
  }

  button {
    width: 7rem;
    padding: 0.25rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    white-space: normal;
  }

  ${isDesktop} {
    margin-right: 2rem;
    flex-direction: row;
    align-items: baseline;

    h2 {
      margin-right: 0.875rem;
    }

    button {
      width: auto;
      height: 2.5rem;
      padding: 0.25rem 2rem;
    }
  }
`
