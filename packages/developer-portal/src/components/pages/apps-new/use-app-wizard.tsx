import React, { useState, Dispatch, SetStateAction, FC, createContext, useContext } from 'react'
import { AppAuthFlow, AppNewStepId } from './config'

export interface AppWizardState {
  currentStep: AppNewStepId | null
  nextStep: AppNewStepId | null
  prevStep: AppNewStepId | null
  stepHistory: (AppNewStepId | null)[]
  authFlow: AppAuthFlow
  lastStep: boolean
}

export interface AppWizardHook {
  appWizardState: AppWizardState
  setAppWizardState: Dispatch<SetStateAction<AppWizardState>>
}

export const defaultAppWizardState: AppWizardState = {
  currentStep: AppNewStepId.whatUserStep,
  nextStep: null,
  prevStep: null,
  stepHistory: [AppNewStepId.whatUserStep],
  authFlow: 'clientCredentials',
  lastStep: false,
}

export const AppWizardContext = createContext<AppWizardHook>({} as AppWizardHook)

const { Provider } = AppWizardContext

export const AppWizardProvider: FC = ({ children }) => {
  const [appWizardState, setAppWizardState] = useState<AppWizardState>(defaultAppWizardState)

  return (
    <Provider
      value={{
        appWizardState,
        setAppWizardState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppWizard = (): AppWizardHook => {
  const { appWizardState, setAppWizardState } = useContext(AppWizardContext)
  return {
    appWizardState,
    setAppWizardState,
  }
}
