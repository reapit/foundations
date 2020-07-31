import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { fetchAppDetail } from '@/actions/apps'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { fetchAppList } from '@/actions/apps'
import { fetchMyIdentity } from '@/actions/developer'
import { appInstallationsRequestData } from '../actions/app-installations'
import { requestDeveloperData } from '@/actions/settings'
import { fetchOrganisationMembers } from '@/actions/developers'
import { getDeveloperId, getClientId } from './session'
import { FetchAppListParams } from '@/reducers/apps/app-list'
import { fetchDesktopIntegrationTypeList } from '@/actions/desktop-integration-types'
import { fetchCategoryList } from '@/actions/categories'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const appId = queryParams.get('appId')
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.APPS:
      store.dispatch(fetchAppList({ page }))
      break
    case Routes.ANALYTICS_TAB: {
      // Fetch all apps to map app name to installations
      const clientId = await getClientId()
      store.dispatch(fetchMyIdentity())
      store.dispatch(fetchAppList({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE }))
      if (appId) {
        store.dispatch(fetchAppDetail({ id: appId, clientId }))
      }
      break
    }
    case Routes.APP_DETAIL: {
      if (id) {
        const clientId = await getClientId()
        const developerId = await getDeveloperId()
        store.dispatch(fetchAppDetail({ id, clientId }))
        store.dispatch(
          appInstallationsRequestData({
            appId: [id],
            pageNumber: 1,
            pageSize: GET_ALL_PAGE_SIZE,
            isInstalled: true,
            developerId: [developerId],
          }),
        )
      }
      break
    }
    case Routes.APPS_EDIT:
      store.dispatch(fetchAppDetail({ id }))
      store.dispatch(fetchCategoryList())
      store.dispatch(fetchDesktopIntegrationTypeList())
      break
    case Routes.SETTINGS:
      store.dispatch(requestDeveloperData())
      break
    case Routes.SETTINGS_ORGANISATION_TAB: {
      const developerId = await getDeveloperId()
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchOrganisationMembers({ id: developerId }))
      break
    }
    case Routes.SETTINGS_BILLING_TAB:
      store.dispatch(requestDeveloperData())
      break
    case Routes.WEBHOOKS:
      store.dispatch(fetchAppList({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE } as FetchAppListParams))
      break
    case Routes.HELP:
      // Need the fetcher to have retrieved the login session only.
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
