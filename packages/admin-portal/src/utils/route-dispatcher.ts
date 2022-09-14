import { FetchDeveloperListValues } from './../actions/devs-management'
import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { fetchApprovalList } from '@/actions/approvals'
import { fetchDeveloperList } from '@/actions/devs-management'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.APPROVALS:
      store.dispatch(fetchApprovalList(Number(page)))
      break
    case Routes.DEV_MANAGEMENT:
      store.dispatch(fetchDeveloperList({ page, queryString: search } as FetchDeveloperListValues))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
