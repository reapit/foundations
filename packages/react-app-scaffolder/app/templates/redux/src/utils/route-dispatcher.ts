import { RouteValue, StringMap } from '@/types/core'
import { getAccessToken } from '@/utils/session'
import store from '@/core/store'
import Routes from '@/constants/routes'
import { homeRequestData } from '@/actions/home'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  await getAccessToken()

  switch (route) {
    case Routes.HOME:
      store.dispatch(homeRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
