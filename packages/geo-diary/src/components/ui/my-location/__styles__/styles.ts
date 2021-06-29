import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isTablet } from '../../../../core/__styles__/media'
import { appointmentListWidthDesktop } from '../../../../core/__styles__/page-layout-variables'

// Modifiers
export const myLocationHasDestination = css``
export const destinationSectionExpanded = css``

export const MyLocationWrap = styled.div`
  display: flex;
  width: 100%;
`

export const MyLocationInnerWrap = styled.div`
  width: 100%;
  &.${myLocationHasDestination} {
    width: calc(100% - 0.875rem);
  }
`

export const MyLocationSection = styled.div`
  display: flex;
  position: relative;
`

export const DestinationLocationSection = styled.div`
  display: flex;
  border-bottom: var(--component-input-border-bottom);
  color: var(--color-black);
  overflow: hidden;
  white-space: nowrap;
  padding: 0 0.5rem;
  height: 0;
  align-items: center;
  opacity: 0;

  &.${destinationSectionExpanded} {
    height: 2.25rem;
    opacity: 1;
  }
`

export const MyLocationSectionResults = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
`

export const MyLocationSectionResult = styled.div`
  position: absolute;
  width: calc(100% + 3rem);
  left: 0;
  padding: 1rem 1.875rem;
  margin-bottom: 0.5rem;
  background-color: #fff;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  color: #0061a8;
  left: -1.5rem;

  svg {
    position: absolute;
    font-size: 1.8rem;
    color: black;
    right: 1.8rem;
    top: 0.75rem;
  }

  ${isTablet} {
    width: ${appointmentListWidthDesktop};
  }
`

export const MyLocationIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid var(--color-grey-medium);

  svg {
    font-size: 1.5rem;
    color: #0061a8;
  }
`

export const DepartureIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0.75rem;
  border: 3px solid var(--intent-primary);
  border-radius: 50%;
  height: 0.875rem;
  width: 0.875rem;
  z-index: 1;
`

export const JourneyIcon = styled.div`
  position: absolute;
  left: 5px;
  top: 25px;
  border-left: 3px solid var(--color-grey-medium);
  height: 1.5rem;
`

export const MyLocationIconWrap = styled.div`
  position: relative;
  width: 0.875rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    position: absolute;
    left: 0;
    height: 1.1rem;
    top: 3rem;
    z-index: 1;
  }
`
