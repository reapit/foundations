import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import Store from '../core/store'
import { clientRequestData } from '../actions/client'
import { myAppsRequestData } from '../actions/my-apps'
import { adminRequestRevisions } from '../actions/admin'
import { developerRequestData } from '../actions/developer'

const routeDispatcher = (route: RouteValue) => {
  switch (route) {
    case Routes.CLIENT:
      Store.dispatch(clientRequestData())
      break
    case Routes.MY_APPS:
      Store.dispatch(myAppsRequestData())
      break
    case Routes.DEVELOPER_MY_APPS:
      Store.dispatch(developerRequestData())
      break
    case Routes.ADMIN:
      Store.dispatch(adminRequestRevisions())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
