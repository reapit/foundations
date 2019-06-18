import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import Store from '../core/store'
import { homeRequestData } from '../actions/home'
import { itemRequestData } from '../actions/item'

const routeDispatcher = (route: RouteValue) => {
  switch (route) {
    case Routes.HOME:
      Store.dispatch(homeRequestData())
      break
    case Routes.ITEM:
      Store.dispatch(itemRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
