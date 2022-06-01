import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { appsBrowseConfigCollection } from './config'

export interface AppsBrowseConfigItemContent {
  brandColour?: string
  strapline?: string
  heroImageUrl?: string
  title?: string
}

export interface AppsBrowseConfigItemFilters {
  developerId?: string
  category?: string[]
  desktopIntegrationTypeId?: string[]
  id?: string[]
  appName?: string
  isFeatured?: boolean
  isFree?: boolean
}

export interface AppsBrowseConfigItem {
  filters: AppsBrowseConfigItemFilters | null
  content: AppsBrowseConfigItemContent | null
}

export interface AppsBrowseConfigCollection {
  featuredHeroApps: AppsBrowseConfigItem[]
  appsFilters: AppsBrowseConfigItem[]
  featuredApps: AppsBrowseConfigItem[]
  simpleApps: AppsBrowseConfigItem[]
}

export interface AppsBrowseDataState {}

export interface AppsBrowseStateHook {
  appsBrowseDataState: AppsBrowseDataState
  appsBrowseFilterState: AppsBrowseConfigItemFilters | null
  appsBrowseConfigState: AppsBrowseConfigCollection | null
  setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFilters | null>>
}

export const AppsBrowseStateContext = createContext<AppsBrowseStateHook>({} as AppsBrowseStateHook)

const { Provider } = AppsBrowseStateContext

export const AppsBrowseProvider: FC = ({ children }) => {
  const [appsBrowseFilterState, setAppsBrowseFilterState] = useState<AppsBrowseConfigItemFilters | null>(null)

  return (
    <Provider
      value={{
        appsBrowseDataState: {},
        appsBrowseFilterState,
        appsBrowseConfigState: appsBrowseConfigCollection,
        setAppsBrowseFilterState: setAppsBrowseFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppsBrowseState = (): AppsBrowseStateHook => {
  return useContext(AppsBrowseStateContext)
}
