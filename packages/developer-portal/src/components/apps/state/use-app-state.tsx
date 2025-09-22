import { Marketplace, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import React, {
  useState,
  Dispatch,
  SetStateAction,
  FC,
  createContext,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { AppAuthFlow, AppNewStepId } from '../new/config'
import { useReapitConnect } from '@reapit/connect-session'
import { AppEditFormSchema, defaultValues } from '../edit/form-schema/form-fields'
import { defaultAppSavingParams, defaultAppWizardState } from './defaults'
import { handleSetDefaultFormValues } from '../utils/handle-default-form-values'
import { FieldNamesMarkedBoolean } from 'react-hook-form'
import { handleSetInitialPipeline } from '../utils/handle-pipeline-event'
import { useChannel } from '@harelpls/use-pusher'

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
  apps: Marketplace.AppSummaryModelPagedResult | null
  appsRefreshing: boolean
  appsLoading: boolean
  appDetail: Marketplace.AppDetailModel | null
  appDetailRefreshing: boolean
  appRevisions: Marketplace.AppRevisionModelPagedResult | null
  appRevisionsLoading: boolean
  appRevisionsRefreshing: boolean
  appDetailLoading: boolean
  appsRefresh: (queryParams?: Object | undefined) => void
  appsDetailRefresh: (queryParams?: Object | undefined) => void
  appRefreshRevisions: () => void
  appsSetPageNumber: Dispatch<SetStateAction<number>>
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
  appLatestRevision: Marketplace.AppRevisionModel | null
  appHasInstallations: boolean
}

export interface AppPipelineState {
  appPipeline: (PipelineModelInterface & { runtime: string }) | null
  appPipelineLoading: boolean
  appPipelineDeploying: boolean
  appPipelineSaving: boolean
  appPipelinePusherChannel: any
  appPipelineRefresh: () => void
  setAppPipeline: Dispatch<SetStateAction<(PipelineModelInterface & { runtime: string }) | null>>
  setAppPipelineDeploying: Dispatch<SetStateAction<boolean>>
  setAppPipelineSaving: Dispatch<SetStateAction<boolean>>
}

export interface AppStateHook {
  appWizardState: AppWizardState
  appsDataState: AppsDataState
  appEditState: AppEditState
  appPipelineState: AppPipelineState
  setAppWizardState: Dispatch<SetStateAction<AppWizardState>>
  appId: string | null
  setAppId: Dispatch<SetStateAction<string | null>>
}

export const AppStateContext = createContext<AppStateHook>({} as AppStateHook)

const { Provider } = AppStateContext

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appWizardState, setAppWizardState] = useState<AppWizardState>(defaultAppWizardState as AppWizardState)
  const [appPipeline, setAppPipeline] = useState<(PipelineModelInterface & { runtime: string }) | null>(null)
  const [appsPageNumber, appsSetPageNumber] = useState<number>(1)
  const [appPipelineDeploying, setAppPipelineDeploying] = useState<boolean>(false)
  const [appPipelineSaving, setAppPipelineSaving] = useState<boolean>(false)
  const [appEditForm, setAppEditForm] = useState<AppEditFormSchema>(defaultValues)
  const [appEditSaving, setAppEditSaving] = useState<AppSavingParams>(defaultAppSavingParams)
  const [appUnsavedFields, setAppUnsavedFields] = useState<FieldNamesMarkedBoolean<AppEditFormSchema>>({})
  const [appIncompleteFields, setIncompleteFields] = useState<(keyof AppEditFormSchema)[]>([])
  const [appId, setAppId] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const developerId = connectSession?.loginIdentity.developerId

  const [apps, appsLoading, , appsRefresh, appsRefreshing] = useReapitGet<Marketplace.AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25, pageNumber: appsPageNumber },
    fetchWhenTrue: [developerId],
  })

  const [appDetail, appDetailLoading, , appsDetailRefresh, appDetailRefreshing] =
    useReapitGet<Marketplace.AppDetailModel>({
      reapitConnectBrowserSession,
      action: getActions[GetActionNames.getAppById],
      uriParams: { appId },
      fetchWhenTrue: [appId],
    })

  const [appRevisions, appRevisionsLoading, , appRefreshRevisions, appRevisionsRefreshing] =
    useReapitGet<Marketplace.AppRevisionModelPagedResult>({
      reapitConnectBrowserSession,
      action: getActions[GetActionNames.getAppRevisions],
      queryParams: { pageSize: 2 },
      uriParams: { appId },
      fetchWhenTrue: [appId],
    })

  const [installations] = useReapitGet<Marketplace.InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      appId,
      pageSize: 1,
      isInstalled: true,
      developerId,
    },
    fetchWhenTrue: [developerId, appId],
  })

  const [pipeline, appPipelineLoading, , appPipelineRefresh] = useReapitGet<
    PipelineModelInterface & { runtime: string }
  >({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPipeline],
    uriParams: { appId },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken, appId],
    onError: () => {
      // TODO we already display errors below, so no need to show a toast here
    },
  })

  const pusherChannel = useChannel(`private-${developerId}`)
  const appPipelinePusherChannel = developerId ? pusherChannel : undefined
  const appLatestRevision = appRevisions?.data ? appRevisions.data[0] : null
  const appHasInstallations = Boolean(installations?.totalCount)

  useEffect(handleSetDefaultFormValues(setAppEditForm, appDetail, developerId), [appDetail, developerId])

  useEffect(handleSetInitialPipeline(pipeline, setAppPipeline), [pipeline])

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
    appsSetPageNumber,
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
    appLatestRevision,
    appHasInstallations,
  }

  const appPipelineState: AppPipelineState = {
    appPipeline,
    appPipelineLoading,
    appPipelineDeploying,
    appPipelineSaving,
    appPipelinePusherChannel,
    appPipelineRefresh,
    setAppPipeline,
    setAppPipelineDeploying,
    setAppPipelineSaving,
  }

  return (
    <Provider
      value={{
        appWizardState,
        appsDataState,
        appEditState,
        appPipelineState,
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
