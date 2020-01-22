import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { homeRequestData } from '../actions/home'
import { checklistDetailRequestData } from '@/actions/checklist-detail'
import { getAccessToken } from './session'
import { identityTypesRequestData } from '@/actions/identity-types'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  await getAccessToken()

  const id = params ? params.id : ''

  switch (route) {
    case Routes.HOME:
      store.dispatch(homeRequestData())
      break
    case Routes.PROFILE_ID:
      store.dispatch(checklistDetailRequestData(id))
      store.dispatch(identityTypesRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
