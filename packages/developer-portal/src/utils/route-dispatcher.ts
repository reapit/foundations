import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { fetchAppDetail } from '@/actions/apps'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { fetchAppList } from '@/actions/apps'
import { fetchMyIdentity } from '@/actions/developer'
import { requestDeveloperData } from '@/actions/settings'
import { fetchOrganisationMembers } from '@/actions/developers'
import { getDeveloperId, getClientId } from './session'
import { fetchCurrentMember } from '@/actions/current-member'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
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
    case Routes.SETTINGS_PROFILE_TAB: {
      const developerId = await getDeveloperId()
      store.dispatch(fetchOrganisationMembers({ id: developerId }))
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      break
    }
    case Routes.SETTINGS_ORGANISATION_TAB: {
      const developerId = await getDeveloperId()
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      store.dispatch(fetchOrganisationMembers({ id: developerId }))
      break
    }
    case Routes.SETTINGS_BILLING_TAB: {
      store.dispatch(fetchCurrentMember())
      store.dispatch(requestDeveloperData())
      break
    }
    case Routes.DESKTOP:
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      break
    case Routes.HELP:
      // Need the fetcher to have retrieved the login session only.
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
