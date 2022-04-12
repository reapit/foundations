import { AppSummaryModelPagedResult, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { defaultWebhooksFilterState } from './defaults'
import { handleHistoryToQueryParams } from '../webhooks-controls'
import { useHistory } from 'react-router'
import { TopicModelPagedResult } from '../../../../services/webhooks'

export interface WebhooksDataState {
  apps: AppSummaryModelPagedResult | null
  topics: TopicModelPagedResult | null
  installations: InstallationModelPagedResult | null
}

export interface WebhooksFilterState {
  applicationId: string
  from: string
  to: string
}

export interface WebhooksStateHook {
  webhooksDataState: WebhooksDataState
  webhooksFilterState: WebhooksFilterState
  setWebhooksFilterState: Dispatch<SetStateAction<WebhooksFilterState>>
}

export const WebhooksStateContext = createContext<WebhooksStateHook>({} as WebhooksStateHook)

const { Provider } = WebhooksStateContext

export const WebhooksProvider: FC = ({ children }) => {
  const history = useHistory()
  const [webhooksFilterState, setWebhooksFilterState] = useState<WebhooksFilterState>({
    ...defaultWebhooksFilterState,
    ...handleHistoryToQueryParams(history),
  })
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  const [topics] = useReapitGet<TopicModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 999 },
    fetchWhenTrue: [developerId],
  })

  const [installations] = useReapitGet<TopicModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: { pageSize: 999, isInstalled: true, developerId },
    fetchWhenTrue: [developerId],
  })

  const webhooksDataState: WebhooksDataState = {
    apps,
    topics,
    installations,
  }

  return (
    <Provider
      value={{
        webhooksDataState,
        webhooksFilterState,
        setWebhooksFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useWebhooksState = (): WebhooksStateHook => {
  return useContext(WebhooksStateContext)
}
