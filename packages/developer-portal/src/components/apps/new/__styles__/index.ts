import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const stepOptionItemSelected = css``

export const StepContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 0.25rem;
  padding: 2rem 1.25rem 0 1.25rem;
  height: calc(100vh - 8.25rem);
  overflow-y: auto;
  scrollbar-width: none;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StepOptionItem = styled.div`
  width: 100%;
  height: 3.75rem;
  margin-bottom: 0.75rem;
  background-color: var(--color-white);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  border: 1px solid var(--color-white);
  color: var(--color-grey-dark);

  &.${stepOptionItemSelected} {
    border: 1px solid var(--intent-secondary);
    color: var(--color-black);
  }
`

export const StepOptionItemText = styled.div`
  width: calc(100% - 4.5rem);
`

export const StepFormContainer = styled.div`
  width: 100%;
  background-color: var(--color-white);
  border-radius: 0.25rem;
  padding: 1.5rem 1.25rem;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
`

export const HelperContentContainer = styled.div`
  margin-top: 4.25rem;
  height: calc(100vh - 8.25rem);
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const stepIsHidden = css`
  display: none;
`

export const ControlsContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: var(--color-white);
  padding: 2rem 2.5rem 2rem 2.5rem;
  width: calc(100% + 2.5rem);
  margin-left: -1.25rem;
`
