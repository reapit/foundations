import { RouteValue } from '@/types/core'
import { getAccessToken } from '@/utils/session'
import store from '@/core/store'
import Routes from '@/constants/routes'
import { authenticatedRequestData } from '@/actions/authenticated'

const routeDispatcher = async (route: RouteValue) => {
  await getAccessToken()

  switch (route) {
    case Routes.HOME:
      store.dispatch(authenticatedRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
