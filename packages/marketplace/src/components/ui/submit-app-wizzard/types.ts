import React from 'react'

export type WizzardStep =
  | 'BEFORE_YOU_START'
  | 'INPUT_APP_NAME'
  | 'CREATE_NEW_APP'
  | 'INPUT_AUTHENTICATION_URIS'
  | 'GRANT_PERMISSION'
  | 'SUBMIT_APP_SUCCESS'

export type SetWizzardStep = React.Dispatch<React.SetStateAction<WizzardStep>>

export type WizzardStepComponent = React.FC<{
  setWizzardStep: React.Dispatch<React.SetStateAction<WizzardStep>>
  afterClose: (() => void) | undefined
  handleUpdateFormState: any
}>
