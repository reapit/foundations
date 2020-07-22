import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { selectDeveloperId } from '@/selector'
import { appDetailRequestData } from './../actions/app-detail'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { developerRequestData, fetchMyIdentity, developerFetchAppDetail } from '@/actions/developer'
import { appInstallationsRequestData } from '../actions/app-installations'
import { submitAppRequestData } from '../actions/submit-app'
import { requestDeveloperData } from '@/actions/settings'
import { selectClientId } from '@/selector/client'
import { DeveloperRequestParams } from '@/reducers/developer'
import { fetchOrganisationMembers } from '@/actions/developers'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const appId = queryParams.get('appId')
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.APPS:
      store.dispatch(submitAppRequestData())
      store.dispatch(developerRequestData({ page }))
      break
    case Routes.ANALYTICS_TAB: {
      // Fetch all apps to map app name to installations
      store.dispatch(fetchMyIdentity())
      store.dispatch(developerRequestData({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE }))
      if (appId) {
        const clientId = selectClientId(store.state)
        store.dispatch(appDetailRequestData({ id: appId, clientId }))
      }
      break
    }
    case Routes.APP_DETAIL: {
      if (id) {
        const clientId = selectClientId(store.state)
        const developerId = selectDeveloperId(store.state) || ''
        store.dispatch(developerFetchAppDetail({ id, clientId }))
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
      store.dispatch(submitAppRequestData())
      store.dispatch(appDetailRequestData({ id }))
      break
    case Routes.SUBMIT_APP:
      store.dispatch(submitAppRequestData())
      break
    case Routes.SETTINGS:
      store.dispatch(requestDeveloperData())
      break
    case Routes.SETTINGS_ORGANISATION_TAB: {
      const developerId = selectDeveloperId(store.state) || ''
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchOrganisationMembers({ id: developerId }))
      break
    }
    case Routes.SETTINGS_BILLING_TAB:
      store.dispatch(requestDeveloperData())
      break
    case Routes.WEBHOOKS:
      store.dispatch(developerRequestData({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE } as DeveloperRequestParams))
      break
    case Routes.HELP:
      // Need the fetcher to have retrieved the login session only.
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
