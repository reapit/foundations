import { appointmentsRequestData } from '@/actions/appointments'
import { RouteValue, StringMap } from '@/types/core'
import Routes from '@/constants/routes'
import store from '@/core/store'
import { verifyAccessToken } from '@/utils/session'
import { homeRequestData } from '@/actions/home'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  await verifyAccessToken()

  switch (route) {
    case Routes.HOME:
      store.dispatch(appointmentsRequestData({ time: 'Today' }))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
