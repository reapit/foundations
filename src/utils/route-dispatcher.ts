import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { clientRequestData } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { developerRequestData } from '../actions/developer'

const routeDispatcher = (route: RouteValue) => {
  switch (route) {
    case Routes.CLIENT:
      store.dispatch(clientRequestData())
      break
    case Routes.MY_APPS:
      store.dispatch(myAppsRequestData())
      break
    case Routes.DEVELOPER_MY_APPS:
      store.dispatch(developerRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
