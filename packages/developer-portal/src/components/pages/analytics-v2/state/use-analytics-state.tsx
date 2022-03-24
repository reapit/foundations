import React, { FC, createContext, useContext } from 'react'

export interface AnalyticsDataState {}

export interface AnalyticsFilterState {}

export interface AnalyticsStateHook {
  analyticsDataState: AnalyticsDataState
  analyticsFilterState: AnalyticsFilterState
}

export const AnalyticsStateContext = createContext<AnalyticsStateHook>({} as AnalyticsStateHook)

const { Provider } = AnalyticsStateContext

export const AnalyticsProvider: FC = ({ children }) => {
  const analyticsDataState: AnalyticsDataState = {}
  const analyticsFilterState: AnalyticsFilterState = {}

  return (
    <Provider
      value={{
        analyticsDataState,
        analyticsFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAnalyticsState = (): AnalyticsStateHook => {
  return useContext(AnalyticsStateContext)
}
