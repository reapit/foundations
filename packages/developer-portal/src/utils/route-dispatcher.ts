import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { requestDeveloperData } from '../actions/settings'
import { fetchCurrentMember } from '../actions/current-member'

const routeDispatcher = async (route: RouteValue) => {
  switch (route) {
    case Routes.DESKTOP:
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
