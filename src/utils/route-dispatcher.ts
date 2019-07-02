import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import Store from '../core/store'
import { clientRequestData } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { developerRequestData } from '../actions/developer'

const routeDispatcher = (route: RouteValue) => {
  switch (route) {
    case Routes.CLIENT:
      Store.dispatch(clientRequestData())
      break
    case Routes.MY_APPS:
      Store.dispatch(myAppsRequestData())
      break
    case Routes.DEVELOPER:
      Store.dispatch(developerRequestData())
      break
    case Routes.SUBMIT_APP:
    case Routes.LOGIN:
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
