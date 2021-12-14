import { elMb10, InputGroup } from '@reapit/elements'
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppNewStepId } from './config'
import { AppWizardState, useAppWizard } from './use-app-wizard'
import { StepFormContainer } from './__styles__'

// Just a stub to auto set the next step to permissions for now. Will be done on validation of form
// when I decide how best to manage the form state with the wizard
export const handleSetAppWizardState = (setAppWizardState: Dispatch<SetStateAction<AppWizardState>>) => () => {
  setAppWizardState((currentState) => ({
    ...currentState,
    nextStep: AppNewStepId.permissionsStep,
  }))
}

export const AuthOptionsContent: FC = () => {
  const { setAppWizardState } = useAppWizard()

  useEffect(handleSetAppWizardState(setAppWizardState), [])

  return (
    <StepFormContainer>
      <InputGroup className={elMb10} label="Login Redirect URI" type="text" />
      <InputGroup label="Logout Redirect URI" type="text" />
    </StepFormContainer>
  )
}
