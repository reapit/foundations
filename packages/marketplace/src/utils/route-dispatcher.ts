import { AdminDevManagementRequestDataValues } from './../actions/admin-dev-management'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { selectDeveloperId } from '@/selector'
import { appDetailRequestData } from './../actions/app-detail'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { clientFetchAppSummary, clientFetchAppDetail } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { installedAppsRequestData } from '../actions/installed-apps'
import { developerRequestData, fetchMyIdentity, developerFetchAppDetail } from '@/actions/developer'
import { adminApprovalsRequestData } from '../actions/admin-approvals'
import { adminDevManagementRequestData } from '../actions/admin-dev-management'
import { appInstallationsRequestData } from '../actions/app-installations'
import { submitAppRequestData } from '../actions/submit-app'
import { requestDeveloperData } from '@/actions/settings'
import { getParamsFromPath } from '@/utils/client-url-params'
import { adminAppsRequestData } from '@/actions/admin-apps'
import { selectClientId } from '@/selector/client'
import { DeveloperRequestParams } from '@/reducers/developer'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const appId = queryParams.get('appId')
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.CLIENT:
      store.dispatch(clientFetchAppSummary(getParamsFromPath(search || '')))
      break
    case Routes.CLIENT_APP_DETAIL: {
      if (id) {
        const clientId = selectClientId(store.state)
        store.dispatch(clientFetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.CLIENT_APP_DETAIL_MANAGE: {
      if (id) {
        const clientId = selectClientId(store.state)
        store.dispatch(clientFetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.INSTALLED_APPS:
      store.dispatch(installedAppsRequestData(page))
      break
    case Routes.MY_APPS:
      store.dispatch(myAppsRequestData(page))
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
    case Routes.DEVELOPER_APP_DETAIL: {
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
    case Routes.DEVELOPER_MY_APPS_EDIT:
      store.dispatch(submitAppRequestData())
      store.dispatch(appDetailRequestData({ id }))
      break
    case Routes.ADMIN_APPROVALS:
      store.dispatch(adminApprovalsRequestData(Number(page)))
      break
    case Routes.ADMIN_DEV_MANAGEMENT:
      store.dispatch(
        adminDevManagementRequestData({ page, queryString: search } as AdminDevManagementRequestDataValues),
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
      store.dispatch(developerRequestData({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE } as DeveloperRequestParams))
      break
    case Routes.DEVELOPER_HELP:
      // Need the fetcher to have retrieved the login session only.
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
