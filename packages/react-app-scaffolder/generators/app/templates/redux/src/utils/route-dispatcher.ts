import { RouteValue } from '@/types/core'
import { getAccessToken } from '@/utils/session'

const routeDispatcher = async (route: RouteValue) => {
  await getAccessToken()

  switch (route) {
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
