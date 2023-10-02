import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { isTablet } from '../../../styles/media'
import { elIsActive } from '../../../styles/states'
import { ElIcon } from '../../icon/__styles__'

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
  background: var(--color-grey-500);
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

  ${ElIcon} {
    color: var(--color-white);
  }

  ${isTablet} {
    display: none;

    &.${elMobileControlsVisible} {
      display: flex;
    }
  }
`

export const ElMobileControlItem = styled.a`
  padding: 0.5rem 1rem;
  background: var(--color-white);
  text-decoration: none;
  border-radius: var(--default-border-radius);
  border: 1px solid var(--color-grey-100);
  font-size: var(--font-size-small);
  font-family: var(--font-sans-serif);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-400);
  margin: 0 0.5rem 1.25rem 0;
  display: none;
  opacity: 1;

  &:last-of-type {
    margin: 0 0.5rem 0.75rem 0;
  }

  &.${elIsActive} {
    display: block;
  }

  &:hover {
    border: 1px solid var(--color-grey-400);
    color: var(--color-grey-700);
  }
`
