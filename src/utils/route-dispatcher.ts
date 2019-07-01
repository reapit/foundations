import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import Store from '../core/store'
import { homeRequestData } from '../actions/home'
import { itemRequestData } from '../actions/item'
import { clientRequestData } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { developerRequestData } from '../actions/developer'

const routeDispatcher = (route: RouteValue) => {
  switch (route) {
    case Routes.HOME:
      Store.dispatch(homeRequestData())
      break
    case Routes.ITEM:
      Store.dispatch(itemRequestData())
      break
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
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
