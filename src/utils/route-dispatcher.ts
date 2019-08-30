import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
// import { homeRequestData } from '../actions/home'
import { appointmentsRequestData } from '../actions/appointments'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  switch (route) {
    case Routes.HOME:
      store.dispatch(appointmentsRequestData({ time: 'Today' }))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
