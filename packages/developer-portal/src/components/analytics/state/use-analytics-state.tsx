import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { defaultAnalyticsFilterState } from './defaults'

export interface AnalyticsDataState {
  apps: AppSummaryModelPagedResult | null
}

export interface AnalyticsFilterState {
  dateFrom: string
  dateTo: string
  monthFrom: string
  monthTo: string
  appId: string
  clientId: string
}

export interface AnalyticsStateHook {
  analyticsDataState: AnalyticsDataState
  analyticsFilterState: AnalyticsFilterState
  setAnalyticsFilterState: Dispatch<SetStateAction<AnalyticsFilterState>>
}

export const AnalyticsStateContext = createContext<AnalyticsStateHook>({} as AnalyticsStateHook)

const { Provider } = AnalyticsStateContext

export const AnalyticsProvider: FC = ({ children }) => {
  const [analyticsFilterState, setAnalyticsFilterState] = useState<AnalyticsFilterState>(defaultAnalyticsFilterState)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 100 },
    fetchWhenTrue: [developerId],
  })

  const analyticsDataState: AnalyticsDataState = {
    apps,
  }

  return (
    <Provider
      value={{
        analyticsDataState,
        analyticsFilterState,
        setAnalyticsFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAnalyticsState = (): AnalyticsStateHook => {
  return useContext(AnalyticsStateContext)
}
