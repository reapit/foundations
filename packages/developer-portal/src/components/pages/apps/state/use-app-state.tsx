import { AppDetailModel, AppSummaryModelPagedResult, MediaModel } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React, { useState, Dispatch, SetStateAction, FC, createContext, useContext, useEffect } from 'react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { AppAuthFlow, AppNewStepId } from '../new/config'
import { useReapitConnect } from '@reapit/connect-session'
import { AppEditFormSchema, defaultValues } from '../edit/form-schema/form-fields'
import { listingInCompletion } from '../utils/listing-in-completion'

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

export const defaultAppWizardState: AppWizardState = {
  currentStep: AppNewStepId.applicationTypeStep,
  nextStep: null,
  prevStep: null,
  stepHistory: [AppNewStepId.applicationTypeStep],
  authFlow: 'clientCredentials',
  lastStep: false,
}

export const handleSetDefaultFormValues =
  (
    setAppEditForm: Dispatch<SetStateAction<AppEditFormSchema>>,
    appDetail: AppDetailModel | null,
    setAppTabsState: Dispatch<SetStateAction<AppTabsState>>,
    developerId?: string | null,
  ) =>
  () => {
    if (appDetail && developerId) {
      const { media, scopes } = appDetail
      const icon = (media ?? []).filter(({ order }) => order === 0)[0]
      const images = (media ?? [])
        .filter(({ type }) => type !== 'icon')
        .reduce(
          (formValuePartial: Partial<AppEditFormSchema>, image: MediaModel, index: number) => ({
            ...formValuePartial,
            [`screen${index + 1}ImageUrl`]: image?.uri ?? '',
          }),
          {
            screen1ImageUrl: '',
          },
        )

      const formValues: AppEditFormSchema = {
        ...defaultValues,
        developerId,
        name: appDetail.name ?? '',
        categoryId: appDetail.category?.id ?? '',
        authFlow: appDetail.authFlow ?? '',
        description: appDetail.description ?? '',
        homePage: appDetail.homePage ?? '',
        telephone: appDetail.telephone ?? '',
        supportEmail: appDetail.supportEmail ?? '',
        summary: appDetail.summary ?? '',
        launchUri: appDetail.launchUri ?? '',
        isListed: appDetail.isListed ?? false,
        isAgencyCloudIntegrated: !appDetail.isDirectApi,
        isFree: appDetail.isFree ?? false,
        privacyPolicyUrl: appDetail.privacyPolicyUrl ?? '',
        pricingUrl: appDetail.pricingUrl ?? '',
        termsAndConditionsUrl: appDetail.termsAndConditionsUrl ?? '',
        scopes: scopes?.map((item) => item.name ?? '').join(',') ?? '',
        redirectUris: appDetail.redirectUris?.join(',') ?? '',
        signoutUris: appDetail.signoutUris?.join(',') ?? '',
        limitToClientIds: appDetail.limitToClientIds?.join(',') ?? '',
        isPrivateApp: Boolean(appDetail.limitToClientIds?.length),
        desktopIntegrationTypeIds: appDetail.desktopIntegrationTypeIds?.join(',') ?? '',
        products: appDetail.products?.join(',') ?? '',
        iconImageUrl: icon?.uri ?? '',
        ...images,
      }

      formValues.isCompletingListing = listingInCompletion(formValues)

      setAppEditForm(formValues)
      setAppTabsState({
        isAgencyCloudIntegrated: formValues.isAgencyCloudIntegrated,
        isCompletingListing: formValues.isCompletingListing,
        isListed: formValues.isListed,
      })
    }
  }

export const AppStateContext = createContext<AppStateHook>({} as AppStateHook)

const { Provider } = AppStateContext

export const AppProvider: FC = ({ children }) => {
  const [appWizardState, setAppWizardState] = useState<AppWizardState>(defaultAppWizardState)
  const [appEditForm, setAppEditForm] = useState<AppEditFormSchema>(defaultValues)
  const [appTabsState, setAppTabsState] = useState<AppTabsState>({
    isCompletingListing: false,
    isAgencyCloudIntegrated: false,
    isListed: false,
  })
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
