import { css } from '@linaria/core'
import { styled } from '@linaria/react'

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

export const MyLocationIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid var(--color-grey-medium);

  svg {
    font-size: 1.5rem;
    color: #0061a8;
    margin: 0 0.25rem;
  }
`

export const MyLocationSection = styled.div`
  display: flex;
  position: relative;

  input:focus + ${MyLocationIconContainer} {
    border-bottom: 1px solid var(--color-black);
    background: var(--color-grey-light);
  }
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
  top: 2rem;
  width: 100%;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.08);
`

export const MyLocationSectionResult = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: #fff;
  cursor: pointer;
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
