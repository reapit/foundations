import { appointmentsRequestData } from '@/actions/appointments'
import { RouteValue } from '@/types/core'
import Routes from '@/constants/routes'
import store from '@/core/store'
import { getAccessToken } from '@/utils/session'

const routeDispatcher = async (route: RouteValue) => {
  await getAccessToken()

  switch (route) {
    case Routes.HOME:
      store.dispatch(appointmentsRequestData({ time: 'Today' }))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
