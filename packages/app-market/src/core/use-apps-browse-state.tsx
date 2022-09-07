import {
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  CategoryModelPagedResult,
  UserModel,
} from '@reapit/foundations-ts-definitions'
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
  appsBrowseCategoriesState: CategoryModelPagedResult | null
  currentUserState: UserModel | null
  refreshCurrentUser: () => void
  setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>
}

export const AppsBrowseStateContext = createContext<AppsBrowseStateHook>({} as AppsBrowseStateHook)

const { Provider } = AppsBrowseStateContext

export const AppsBrowseProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appsBrowseFilterState, setAppsBrowseFilterState] = useState<AppsBrowseConfigItemFiltersInterface | null>(null)
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email).replace(/=+$/, '') : null

  const [appsBrowseConfigCollection] = useReapitGet<AppsBrowseConfigCollection>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppMarketAdminLive],
    fetchWhenTrue: [connectSession],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [appsBrowseCategoriesCollection] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  const [currentUser, , , refreshCurrentUser] = useReapitGet<UserModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getUserById],
    uriParams: {
      userId,
    },
    fetchWhenTrue: [userId],
  })

  return (
    <Provider
      value={{
        appsBrowseFilterState,
        appsBrowseConfigState: appsBrowseConfigCollection,
        appsBrowseCategoriesState: appsBrowseCategoriesCollection,
        currentUserState: currentUser,
        refreshCurrentUser,
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
