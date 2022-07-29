import { AppsBrowseConfigItemFiltersInterface, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch } from 'react'
import { useReapitConnect } from '../../../connect-session/src'
import { reapitConnectBrowserSession } from './connect-session'

export interface AppsBrowseConfigItemContent {
  brandColour?: string
  strapline?: string
  imageUrl?: string
  iconName?: string
  title?: string
}

export type AppsBrowseConfigType = 'featuredHeroApps' | 'heroApps' | 'appsFilters' | 'featuredApps' | 'simpleApps'

export interface AppBrowseLiveData {
  timeFrom?: string
  timeTo?: string
  isLive?: boolean
}

export interface AppsBrowseConfigCollection {
  items: AppsBrowseConfigItemInterface[]
}

export interface AppsBrowseStateHook {
  appsBrowseFilterState: AppsBrowseConfigItemFiltersInterface | null
  appsBrowseConfigState: AppsBrowseConfigCollection | null
  setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>
}

export const AppsBrowseStateContext = createContext<AppsBrowseStateHook>({} as AppsBrowseStateHook)

const { Provider } = AppsBrowseStateContext

export const AppsBrowseProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appsBrowseFilterState, setAppsBrowseFilterState] = useState<AppsBrowseConfigItemFiltersInterface | null>(null)

  const [appsBrowseConfigCollection] = useReapitGet<AppsBrowseConfigCollection>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppMarketAdminLive],
    fetchWhenTrue: [connectSession],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  return (
    <Provider
      value={{
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
