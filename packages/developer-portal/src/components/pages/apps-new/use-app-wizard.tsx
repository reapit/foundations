import React, { useState, Dispatch, SetStateAction, FC, createContext, useContext } from 'react'
import { AppNewStepId } from './config'

export interface AppWizardState {
  currentStep: AppNewStepId
  nextStep: AppNewStepId | null
  prevStep: AppNewStepId | null
}

export interface AppWizardHook {
  appWizardState: AppWizardState
  setAppWizardState: Dispatch<SetStateAction<AppWizardState>>
}

export const defaultAppWizardState: AppWizardState = {
  currentStep: AppNewStepId.whatUserStep,
  nextStep: null,
  prevStep: null,
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
