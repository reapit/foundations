import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { defaultAnalyticsFilterState } from './defaults'

export interface AnalyticsDataState {}

export type AnalyticsDateRange = 'today' | 'week' | 'month'

export interface AnalyticsFilterState {
  dateFrom: string
  dateTo: string
  month: string
  appId: string
  clientId: string
  dateRange: AnalyticsDateRange | null
}

export interface AnalyticsStateHook {
  analyticsDataState: AnalyticsDataState
  setAnalyticsDataState: Dispatch<SetStateAction<AnalyticsDataState>>
  analyticsFilterState: AnalyticsFilterState
  setAnalyticsFilterState: Dispatch<SetStateAction<AnalyticsFilterState>>
}

export const AnalyticsStateContext = createContext<AnalyticsStateHook>({} as AnalyticsStateHook)

const { Provider } = AnalyticsStateContext

export const AnalyticsProvider: FC = ({ children }) => {
  const [analyticsDataState, setAnalyticsDataState] = useState<AnalyticsDataState>({})
  const [analyticsFilterState, setAnalyticsFilterState] = useState<AnalyticsFilterState>(defaultAnalyticsFilterState)

  return (
    <Provider
      value={{
        analyticsDataState,
        setAnalyticsDataState,
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
