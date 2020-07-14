import { AdminDevManagementRequestDataValues } from './../actions/admin-dev-management'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { approvalsRequestData } from '../actions/approvals'
import { adminDevManagementRequestData } from '../actions/admin-dev-management'
import { getParamsFromPath } from '@/utils/client-url-params'
import { adminAppsRequestData } from '@/actions/admin-apps'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.ADMIN_APPROVALS:
      store.dispatch(approvalsRequestData(Number(page)))
      break
    case Routes.DEV_MANAGEMENT:
      store.dispatch(
        adminDevManagementRequestData({ page, queryString: search } as AdminDevManagementRequestDataValues),
      )
      break
    case Routes.APPS:
      store.dispatch(adminAppsRequestData(getParamsFromPath(search || '')))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
