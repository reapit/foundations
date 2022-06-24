import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { appsBrowseConfigCollection } from './config'

export interface AppsBrowseConfigItemContent {
  brandColour?: string
  strapline?: string
  imageUrl?: string
  iconName?: string
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

export type AppsBrowseConfigType = 'featuredHeroApps' | 'heroApps' | 'appsFilters' | 'featuredApps' | 'simpleApps'

export interface AppBrowseLiveData {
  timeFrom?: string
  timeTo?: string
  isLive?: boolean
}

export interface AppsBrowseConfigItem {
  filters: AppsBrowseConfigItemFilters | null
  content: AppsBrowseConfigItemContent | null
  configType: AppsBrowseConfigType
  live: AppBrowseLiveData
}

export interface AppsBrowseConfigCollection {
  data: AppsBrowseConfigItem[]
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
