import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { homeRequestData } from '../actions/home'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  switch (route) {
    case Routes.HOME:
      store.dispatch(homeRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
