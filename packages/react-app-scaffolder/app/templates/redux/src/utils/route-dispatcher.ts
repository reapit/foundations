import { RouteValue } from '@/types/core'
import store from '@/core/store'
import Routes from '@/constants/routes'
import { authenticatedRequestData } from '@/actions/authenticated'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const routeDispatcher = async (route: RouteValue) => {
  await reapitConnectBrowserSession.connectSession()

  switch (route) {
    case Routes.HOME:
      store.dispatch(authenticatedRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
