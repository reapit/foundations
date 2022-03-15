import {
  AppDetailModel,
  AppRevisionModelPagedResult,
  AppSummaryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React, { useState, Dispatch, SetStateAction, FC, createContext, useContext, useEffect } from 'react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { AppAuthFlow, AppNewStepId } from '../new/config'
import { useReapitConnect } from '@reapit/connect-session'
import { AppEditFormSchema, defaultValues } from '../edit/form-schema/form-fields'
import { defaultAppSavingParams, defaultAppWizardState } from './defaults'
import { handleSetDefaultFormValues } from '../utils/handle-default-form-values'
import { FieldNamesMarkedBoolean } from 'react-hook-form'

export interface AppUriParams {
  appId: string
}

export interface AppSavingParams {
  isSaving: boolean
  isRevalidating: boolean
  isListed: boolean
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
  appsRefreshing: boolean
  appsLoading: boolean
  appDetail: AppDetailModel | null
  appDetailRefreshing: boolean
  appRevisions: AppRevisionModelPagedResult | null
  appRevisionsLoading: boolean
  appRevisionsRefreshing: boolean
  appDetailLoading: boolean
  appsRefresh: (queryParams?: Object | undefined) => void
  appsDetailRefresh: (queryParams?: Object | undefined) => void
  appRefreshRevisions: () => void
}

export interface AppEditState {
  appEditForm: AppEditFormSchema
  setAppEditForm: Dispatch<SetStateAction<AppEditFormSchema>>
  appEditSaving: AppSavingParams
  setAppEditSaving: Dispatch<SetStateAction<AppSavingParams>>
  appUnsavedFields: FieldNamesMarkedBoolean<AppEditFormSchema>
  setAppUnsavedFields: Dispatch<SetStateAction<FieldNamesMarkedBoolean<AppEditFormSchema>>>
  appIncompleteFields: (keyof AppEditFormSchema)[]
  setIncompleteFields: Dispatch<SetStateAction<(keyof AppEditFormSchema)[]>>
}

export interface AppStateHook {
  appWizardState: AppWizardState
  appsDataState: AppsDataState
  appEditState: AppEditState
  setAppWizardState: Dispatch<SetStateAction<AppWizardState>>
  appId: string | null
  setAppId: Dispatch<SetStateAction<string | null>>
}

export const AppStateContext = createContext<AppStateHook>({} as AppStateHook)

const { Provider } = AppStateContext

export const AppProvider: FC = ({ children }) => {
  const [appWizardState, setAppWizardState] = useState<AppWizardState>(defaultAppWizardState as AppWizardState)
  const [appEditForm, setAppEditForm] = useState<AppEditFormSchema>(defaultValues)
  const [appEditSaving, setAppEditSaving] = useState<AppSavingParams>(defaultAppSavingParams)
  const [appUnsavedFields, setAppUnsavedFields] = useState<FieldNamesMarkedBoolean<AppEditFormSchema>>({})
  const [appIncompleteFields, setIncompleteFields] = useState<(keyof AppEditFormSchema)[]>([])
  const [appId, setAppId] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const developerId = connectSession?.loginIdentity.developerId

  const [apps, appsLoading, , appsRefresh, appsRefreshing] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  const [appDetail, appDetailLoading, , appsDetailRefresh, appDetailRefreshing] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: { appId },
    fetchWhenTrue: [appId],
  })

  const [appRevisions, appRevisionsLoading, , appRefreshRevisions, appRevisionsRefreshing] =
    useReapitGet<AppRevisionModelPagedResult>({
      reapitConnectBrowserSession,
      action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppRevisions],
      queryParams: { pageSize: 2 },
      uriParams: { appId },
      fetchWhenTrue: [appId],
    })

  useEffect(handleSetDefaultFormValues(setAppEditForm, appDetail, developerId), [appDetail, developerId])

  const appsDataState: AppsDataState = {
    apps,
    appsLoading,
    appsRefreshing,
    appDetail,
    appDetailLoading,
    appDetailRefreshing,
    appRevisions,
    appRevisionsLoading,
    appRevisionsRefreshing,
    appsRefresh,
    appsDetailRefresh,
    appRefreshRevisions,
  }

  const appEditState: AppEditState = {
    appEditForm,
    setAppEditForm,
    appEditSaving,
    setAppEditSaving,
    appUnsavedFields,
    setAppUnsavedFields,
    appIncompleteFields,
    setIncompleteFields,
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
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppState = (): AppStateHook => {
  return useContext(AppStateContext)
}
