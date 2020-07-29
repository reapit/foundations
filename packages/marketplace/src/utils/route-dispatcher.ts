import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '@/core/store'
import { clientFetchAppSummary, clientFetchAppDetail } from '@/actions/apps'
import { myAppsRequestData } from '@/actions/apps'
import { installedAppsRequestData } from '@/actions/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { fetchDesktopIntegrationTypes } from '@/actions/desktop-integration-types'
import { fetchCategories } from '@/actions/categories'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1
  // preview apps feature
  const preview = queryParams.get('preview') ? true : false
  const connectSession = await reapitConnectBrowserSession.connectSession()
  const clientId = connectSession ? selectClientId(connectSession) : ''

  switch (route) {
    case Routes.APPS:
      store.dispatch(fetchDesktopIntegrationTypes({}))
      store.dispatch(fetchCategories({}))
      store.dispatch(clientFetchAppSummary({ page: 1, preview }))
      break
    case Routes.APP_DETAIL: {
      if (id) {
        store.dispatch(clientFetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.APP_DETAIL_MANAGE: {
      if (id) {
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
