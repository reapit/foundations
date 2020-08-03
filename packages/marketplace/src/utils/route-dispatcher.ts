import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '@/core/store'
import { fetchFeatureApps, fetchAppDetail } from '@/actions/apps'
import { fetchApps } from '@/actions/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { fetchDesktopIntegrationTypes } from '@/actions/desktop-integration-types'
import { fetchCategories } from '@/actions/categories'
import { APPS_PER_PAGE, FEATURED_APPS, INSTALLED_APPS_PERPAGE } from '@/constants/paginator'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1
  const preview = queryParams.get('preview')?.toLowerCase() === 'true'

  const connectSession = await reapitConnectBrowserSession.connectSession()
  const clientId = connectSession ? selectClientId(connectSession) : ''

  switch (route) {
    case Routes.APPS:
      store.dispatch(fetchDesktopIntegrationTypes({}))
      store.dispatch(fetchCategories({}))
      store.dispatch(fetchFeatureApps({ pageNumber: 1, pageSize: FEATURED_APPS, preview }))
      store.dispatch(
        fetchApps({
          pageNumber: page,
          pageSize: APPS_PER_PAGE,
          isFeatured: false,
          preview,
        }),
      )
      break
    case Routes.APP_DETAIL: {
      if (id) {
        store.dispatch(fetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.APP_DETAIL_MANAGE: {
      if (id) {
        store.dispatch(fetchAppDetail({ id, clientId }))
      }
      break
    }
    case Routes.INSTALLED_APPS:
      store.dispatch(
        fetchApps({
          pageNumber: page,
          pageSize: INSTALLED_APPS_PERPAGE,
          onlyInstalled: true,
          isDirectApi: false,
        }),
      )
      break
    case Routes.MY_APPS:
      store.dispatch(fetchApps({ onlyInstalled: true, pageNumber: page, pageSize: APPS_PER_PAGE }))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
