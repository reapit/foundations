import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { homeRequestData } from '../actions/home'
import { getAccessToken } from './session'

const routeDispatcher = async (route: RouteValue, _params?: StringMap) => {
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
