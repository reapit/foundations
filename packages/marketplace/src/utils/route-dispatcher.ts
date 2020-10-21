import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '@/core/store'
import { fetchFeatureApps, fetchAppDetail, fetchDeveloperApps } from '@/actions/apps'
import { fetchApps } from '@/actions/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId, selectDeveloperId, selectSandboxDeveloper } from '@/selector/auth'
// needed for filtering but turned off at present
// import { fetchDesktopIntegrationTypes } from '@/actions/desktop-integration-types'
// import { fetchCategories } from '@/actions/categories'
import { APPS_PER_PAGE, FEATURED_APPS, INSTALLED_APPS_PERPAGE } from '@/constants/paginator'
import { getNumberOfItems } from './browse-app'

const routeDispatcher = async (route: RouteValue, params?: StringMap, search?: string) => {
  const id = params && params.appid ? params.appid : ''
  const queryParams = new URLSearchParams(search)
  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1
  const preview = queryParams.get('preview')?.toLowerCase() === 'true'

  const connectSession = await reapitConnectBrowserSession.connectSession()
  if (!connectSession) return null
  const clientId = selectClientId(connectSession)
  const developerId = selectDeveloperId(connectSession)
  const isSandboxDeveloper = selectSandboxDeveloper(connectSession)

  switch (route) {
    case Routes.APPS: {
      const numOfItemsPerPage = getNumberOfItems()
      // store.dispatch(fetchDesktopIntegrationTypes({}))
      // store.dispatch(fetchCategories({}))
      if (developerId) {
        store.dispatch(
          fetchDeveloperApps({
            pageNumber: page,
            pageSize: numOfItemsPerPage,
            developerId: [developerId],
          }),
        )
      }
      store.dispatch(fetchFeatureApps({ pageNumber: 1, pageSize: FEATURED_APPS, preview }))
      store.dispatch(
        fetchApps({
          pageNumber: page,
          pageSize: numOfItemsPerPage,
          preview,
          isInfinite: true,
        }),
      )
      break
    }
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
          developerId: isSandboxDeveloper && developerId ? [developerId] : undefined,
        }),
      )
      break
    case Routes.MY_APPS:
      store.dispatch(
        fetchApps({
          onlyInstalled: true,
          pageNumber: page,
          pageSize: APPS_PER_PAGE,
          developerId: isSandboxDeveloper && developerId ? [developerId] : undefined,
        }),
      )
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
