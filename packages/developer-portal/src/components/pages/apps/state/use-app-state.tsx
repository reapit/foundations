import { AppDetailModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React, { useState, Dispatch, SetStateAction, FC, createContext, useContext } from 'react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { AppAuthFlow, AppNewStepId } from '../new/config'
import { useReapitConnect } from '@reapit/connect-session'

export interface AppUriParams {
  appId: string
}

export interface AppWizardState {
  currentStep: AppNewStepId | null
  nextStep: AppNewStepId | null
  prevStep: AppNewStepId | null
  stepHistory: (AppNewStepId | null)[]
  authFlow: AppAuthFlow
  lastStep: boolean
}

export interface AppsDataState {
  apps: AppSummaryModelPagedResult | null
  appsLoading: boolean
  appDetail: AppDetailModel | null
  appDetailLoading: boolean
  appsRefresh: (queryParams?: Object | undefined) => void
}

export interface AppStateHook {
  appWizardState: AppWizardState
  appsDataState: AppsDataState
  setAppWizardState: Dispatch<SetStateAction<AppWizardState>>
  appId: string | null
  setAppId: Dispatch<SetStateAction<string | null>>
}

export const defaultAppWizardState: AppWizardState = {
  currentStep: AppNewStepId.applicationTypeStep,
  nextStep: null,
  prevStep: null,
  stepHistory: [AppNewStepId.applicationTypeStep],
  authFlow: 'clientCredentials',
  lastStep: false,
}

export const AppStateContext = createContext<AppStateHook>({} as AppStateHook)

const { Provider } = AppStateContext

export const AppProvider: FC = ({ children }) => {
  const [appWizardState, setAppWizardState] = useState<AppWizardState>(defaultAppWizardState)
  const [appId, setAppId] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const developerId = connectSession?.loginIdentity.developerId

  const [apps, appsLoading, , appsRefresh] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  const [appDetail, appDetailLoading] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: { appId },
    fetchWhenTrue: [appId],
  })

  const appsDataState: AppsDataState = {
    apps,
    appsLoading,
    appDetail,
    appDetailLoading,
    appsRefresh,
  }

  return (
    <Provider
      value={{
        appWizardState,
        appsDataState,
        setAppWizardState,
        appId,
        setAppId,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppState = (): AppStateHook => {
  return useContext(AppStateContext)
}
