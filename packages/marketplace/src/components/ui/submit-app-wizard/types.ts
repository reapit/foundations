import React from 'react'

export type WizardStep =
  | 'BEFORE_YOU_START'
  | 'INPUT_APP_NAME'
  | 'CREATE_NEW_APP'
  | 'INPUT_AUTHENTICATION_URIS'
  | 'GRANT_PERMISSION'
  | 'SUBMIT_APP_SUCCESS'

export type SetWizardStep = React.Dispatch<React.SetStateAction<WizardStep>>

export type WizardStepComponent = React.FC<{
  setWizardStep: React.Dispatch<React.SetStateAction<WizardStep>>
  afterClose: (() => void) | undefined
}>
