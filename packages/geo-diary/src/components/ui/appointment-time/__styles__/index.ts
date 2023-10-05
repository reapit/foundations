import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isTablet } from '../../../../core/__styles__/media'

export const appointmentTimeContainerExpanded = css``

export const AppointmentTimeContainer = styled.div`
  height: 0;
  position: sticky;
  top: 10rem;
  padding: 0 1.5rem 0 1.5rem;
  background-color: var(--color-grey-light);
  width: 100%;
  overflow: hidden;
  transition: opacity 0.2s linear;
  opacity: 0;
  z-index: 1;

  ${isTablet} {
    width: 23rem;
    z-index: 0;
  }

  &.${appointmentTimeContainerExpanded} {
    height: 3.75rem;
    padding: 1.25rem 1.5rem 0 1.5rem;
    opacity: 1;
  }
`
