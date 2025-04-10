import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const StepWizardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const stepWizardActive = css``

export const StepWizardChild = styled.div`
  display: none;
  width: 100%;

  &.${stepWizardActive} {
    display: block;
  }
`
