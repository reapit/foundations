import { AdminDevManagementRequestDataValues } from './../actions/admin-dev-management'
import { appDetailRequestData } from './../actions/app-detail'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import { GET_ALL_PAGE_SIZE } from '../constants/paginator'
import store from '../core/store'
import { clientRequestData } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { installedAppsRequestData } from '../actions/installed-apps'
import { developerRequestData, fetchMyIdentity } from '@/actions/developer'
import { adminApprovalsRequestData } from '../actions/admin-approvals'
import { adminDevManagementRequestData } from '../actions/admin-dev-management'
import { submitAppRequestData } from '../actions/submit-app'
import { getAccessToken } from './session'
import { requestDeveloperData } from '@/actions/settings'
import { getParamsFromPath } from '@/utils/client-url-params'
import { adminAppsRequestData } from '@/actions/admin-apps'
import { selectClientId } from '@/selector/client'
import { DeveloperRequestParams } from '@/reducers/developer'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  await getAccessToken()
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const appId = queryParams.get('appId')

  switch (route) {
    case Routes.CLIENT:
      store.dispatch(clientRequestData(getParamsFromPath(search || '')))
      break
    case Routes.INSTALLED_APPS:
      store.dispatch(installedAppsRequestData(1))
      break
    case Routes.INSTALLED_APPS_PAGINATE:
      store.dispatch(installedAppsRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.MY_APPS:
      store.dispatch(myAppsRequestData(1))
      break
    case Routes.MY_APPS_PAGINATE:
      store.dispatch(myAppsRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.DEVELOPER_MY_APPS:
      store.dispatch(developerRequestData({ page: 1 }))
      break
    case Routes.DEVELOPER_ANALYTICS_TAB: {
      // Fetch all apps to map app name to installations
      store.dispatch(fetchMyIdentity())
      store.dispatch(developerRequestData({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE }))
      if (appId) {
        const clientId = selectClientId(store.state)
        store.dispatch(appDetailRequestData({ id: appId, clientId }))
      }
      break
    }
    case Routes.DEVELOPER_MY_APPS_EDIT:
      store.dispatch(submitAppRequestData())
      store.dispatch(appDetailRequestData({ id }))
      break
    case Routes.DEVELOPER_MY_APPS_PAGINATE:
      store.dispatch(developerRequestData({ page: params && params.page ? Number(params.page) : 1 }))
      break
    case Routes.ADMIN_APPROVALS:
      store.dispatch(adminApprovalsRequestData(1))
      break
    case Routes.ADMIN_APPROVALS_PAGINATE:
      store.dispatch(adminApprovalsRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.ADMIN_DEV_MANAGEMENT:
      store.dispatch(
        adminDevManagementRequestData({ page: 1, queryString: search } as AdminDevManagementRequestDataValues),
      )
      break
    case Routes.ADMIN_DEV_MANAGEMENT_PAGINATE:
      store.dispatch(
        adminDevManagementRequestData({
          page: params && params.page ? Number(params.page) : 1,
          queryString: search,
        } as AdminDevManagementRequestDataValues),
      )
      break
    case Routes.SUBMIT_APP:
      store.dispatch(submitAppRequestData())
      break
    case Routes.ADMIN_APPS:
      store.dispatch(adminAppsRequestData(getParamsFromPath(search || '')))
      break
    case Routes.SETTINGS:
      store.dispatch(requestDeveloperData())
      break
    case Routes.DEVELOPER_WEBHOOKS:
      store.dispatch(developerRequestData({ page: 1, appsPerPage: PAGE_SIZE_FOR_ALL_APPS } as DeveloperRequestParams))
      break
    case Routes.DEVELOPER_HELP:
      // Need the fetcher to have retrieved the login session only.
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
