import { DevsManagementRequestDataValues } from './../actions/devs-management'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { fetchApprovalsData } from '../actions/approvals'
import { devsManagementRequestData } from '../actions/devs-management'
import { getParamsFromPath } from '@/utils/client-url-params'
import { appsRequestData } from '@/actions/apps-management'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.APPROVALS:
      store.dispatch(fetchApprovalsData(Number(page)))
      break
    case Routes.DEV_MANAGEMENT:
      store.dispatch(devsManagementRequestData({ page, queryString: search } as DevsManagementRequestDataValues))
      break
    case Routes.APPS:
      store.dispatch(appsRequestData(getParamsFromPath(search || '')))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
