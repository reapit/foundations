import { Dispatch, SetStateAction } from 'react'
import { AppAuthFlow, AppNewStepId } from './config'
import { AppWizardState } from '../state/use-app-state'

export const handleSetAppWizardState =
  (
    setAppWizardState: Dispatch<SetStateAction<AppWizardState>>,
    nextStep: AppNewStepId,
    authFlow: AppAuthFlow = 'clientCredentials',
  ) =>
  () => {
    setAppWizardState((currentState) => ({
      ...currentState,
      nextStep,
      authFlow,
    }))
  }
