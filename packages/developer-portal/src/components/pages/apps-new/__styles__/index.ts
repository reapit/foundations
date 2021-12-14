import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const stepOptionItemSelected = css``

export const StepContainer = styled.div`
  background-color: var(--color-grey-light);
  border-radius: 0.25rem;
  padding: 2rem 1.25rem;
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

  &.${stepOptionItemSelected} {
    border: 1px solid var(--intent-secondary);
  }
`

export const StepFormContainer = styled.div`
  width: 100%;
  background-color: var(--color-white);
  border-radius: 0.25rem;
  padding: 1.5rem 1.25rem;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
`
