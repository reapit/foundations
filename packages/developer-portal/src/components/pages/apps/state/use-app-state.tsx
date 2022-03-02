import { AppDetailModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React, { useState, Dispatch, SetStateAction, FC, createContext, useContext, useEffect } from 'react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { AppAuthFlow, AppNewStepId } from '../new/config'
import { useReapitConnect } from '@reapit/connect-session'
import { AppEditFormSchema, defaultValues } from '../edit/form-schema/form-fields'
import { defaultAppTabsState, defaultAppWizardState } from './defaults'
import { handleSetDefaultFormValues } from '../utils/handle-default-form-values'

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

export interface AppEditState {
  appEditForm: AppEditFormSchema
  setAppEditForm: Dispatch<SetStateAction<AppEditFormSchema>>
  appEditSaving: boolean
  setAppEditSaving: Dispatch<SetStateAction<boolean>>
}

export interface AppTabsState {
  isListed: boolean
  isCompletingListing: boolean
  isAgencyCloudIntegrated: boolean
}

export interface AppStateHook {
  appWizardState: AppWizardState
  appsDataState: AppsDataState
  appEditState: AppEditState
  setAppWizardState: Dispatch<SetStateAction<AppWizardState>>
  appId: string | null
  setAppId: Dispatch<SetStateAction<string | null>>
  appTabsState: AppTabsState
  setAppTabsState: Dispatch<SetStateAction<AppTabsState>>
}

export const AppStateContext = createContext<AppStateHook>({} as AppStateHook)

const { Provider } = AppStateContext

export const AppProvider: FC = ({ children }) => {
  const [appWizardState, setAppWizardState] = useState<AppWizardState>(defaultAppWizardState as AppWizardState)
  const [appEditForm, setAppEditForm] = useState<AppEditFormSchema>(defaultValues)
  const [appTabsState, setAppTabsState] = useState<AppTabsState>(defaultAppTabsState)
  const [appEditSaving, setAppEditSaving] = useState<boolean>(false)
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

  useEffect(handleSetDefaultFormValues(setAppEditForm, appDetail, setAppTabsState, developerId), [
    appDetail,
    developerId,
  ])

  const appsDataState: AppsDataState = {
    apps,
    appsLoading,
    appDetail,
    appDetailLoading,
    appsRefresh,
  }

  const appEditState: AppEditState = {
    appEditForm,
    setAppEditForm,
    appEditSaving,
    setAppEditSaving,
  }

  return (
    <Provider
      value={{
        appWizardState,
        appsDataState,
        appEditState,
        setAppWizardState,
        appId,
        setAppId,
        appTabsState,
        setAppTabsState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppState = (): AppStateHook => {
  return useContext(AppStateContext)
}
