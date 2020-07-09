import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { clientFetchAppSummary, clientFetchAppDetail } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { installedAppsRequestData } from '../actions/installed-apps'
import { getParamsFromPath } from '@/utils/client-url-params'
import { selectClientId } from '@/selector/client'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1

  switch (route) {
    case Routes.APPS:
      store.dispatch(clientFetchAppSummary(getParamsFromPath(search || '')))
      break
    case Routes.APP_DETAIL: {
      if (id) {
        const clientId = selectClientId(store.state)
        store.dispatch(clientFetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.APP_DETAIL_MANAGE: {
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
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
