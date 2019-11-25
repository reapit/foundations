import { appDetailRequestData } from './../actions/app-detail'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { clientRequestData } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { developerRequestData } from '../actions/developer'
import { adminApprovalsRequestData } from '../actions/admin-approvals'
import { submitAppRequestData } from '../actions/submit-app'
import { getAccessToken } from './session'
import { requestDeveloperData } from '@/actions/settings'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  await getAccessToken()
  switch (route) {
    case Routes.CLIENT:
      store.dispatch(clientRequestData(1))
      break
    case Routes.CLIENT_PAGINATE:
      store.dispatch(clientRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.MY_APPS:
      store.dispatch(myAppsRequestData(1))
      break
    case Routes.MY_APPS_PAGINATE:
      store.dispatch(myAppsRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.DEVELOPER_MY_APPS:
      store.dispatch(developerRequestData(1))
      break
    case Routes.DEVELOPER_MY_APPS_EDIT:
      const id = params && params.appid ? params.appid : ''
      store.dispatch(submitAppRequestData())
      store.dispatch(appDetailRequestData({ id }))
      break
    case Routes.DEVELOPER_MY_APPS_PAGINATE:
      store.dispatch(developerRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.ADMIN_APPROVALS:
      store.dispatch(adminApprovalsRequestData(1))
      break
    case Routes.ADMIN_APPROVALS_PAGINATE:
      store.dispatch(adminApprovalsRequestData(params && params.page ? Number(params.page) : 1))
      break
    case Routes.SUBMIT_APP:
      store.dispatch(submitAppRequestData())
      break
    case Routes.SETTINGS:
      store.dispatch(requestDeveloperData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
