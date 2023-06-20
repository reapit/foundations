import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { isTablet } from '../../../styles/media'
import { elIsActive } from '../../../styles/states'

export const elMobileControlsVisible = css`
  display: flex;
`

export const ElMobileControlsBg = styled.div`
  display: none;
  z-index: 98;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--color-grey-dark);
  opacity: 0.2;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

export const ElMobileControls = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  bottom: 0.75rem;
  right: 0.75rem;
  z-index: 99;

  ${isTablet} {
    display: none;

    &.${elMobileControlsVisible} {
      display: flex;
    }
  }
`

export const ElMobileControlItem = styled.a`
  padding: 0.5rem 1rem;
  color: var(--intent-primary);
  background: var(--color-white);
  text-decoration: none;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  margin: 0 0.5rem 1.25rem 0;
  display: none;
  opacity: 1;
  font-weight: bold;
  text-transform: uppercase;

  &:last-of-type {
    margin: 0 0.5rem 0.75rem 0;
  }

  &.${elIsActive} {
    display: block;
  }
`
