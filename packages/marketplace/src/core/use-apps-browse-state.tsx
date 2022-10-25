import {
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  CategoryModel,
  CategoryModelPagedResult,
  UserModel,
} from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch, useMemo } from 'react'
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
  appsBrowseCategoriesState: CategoryModel[]
  currentUserState: UserModel | null
  refreshCurrentUser: () => void
  setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>
}

export const handleSortCategoryies = (appsBrowseCategoriesCollection: CategoryModelPagedResult | null) => () =>
  appsBrowseCategoriesCollection?.data?.sort((a, b) => {
    const nameA = a.name?.toUpperCase()
    const nameB = b.name?.toUpperCase()

    if (!nameA || !nameB) return 0

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  }) ?? []

export const AppsBrowseStateContext = createContext<AppsBrowseStateHook>({} as AppsBrowseStateHook)

const { Provider } = AppsBrowseStateContext

export const AppsBrowseProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appsBrowseFilterState, setAppsBrowseFilterState] = useState<AppsBrowseConfigItemFiltersInterface | null>(null)
  const email = connectSession?.loginIdentity.email
  const userId = email ? window.btoa(email).replace(/=/g, '') : null
  const searchQuery = new URLSearchParams(window.location.search)
  const id = searchQuery.get('previewId')
  const idQuery = id ? { id } : {}

  const [appsBrowseConfigCollection] = useReapitGet<AppsBrowseConfigCollection>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppMarketAdminLive],
    fetchWhenTrue: [connectSession],
    queryParams: {
      isLive: true,
      ...idQuery,
    },
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

  const appsBrowseCategoriesState = useMemo(handleSortCategoryies(appsBrowseCategoriesCollection), [
    appsBrowseCategoriesCollection,
  ])

  return (
    <Provider
      value={{
        appsBrowseFilterState,
        appsBrowseConfigState: appsBrowseConfigCollection,
        appsBrowseCategoriesState,
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
