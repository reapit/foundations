import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { checklistDetailRequestData } from '@/actions/checklist-detail'
import { identityTypesRequestData } from '@/actions/identity-types'

const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  const id = params ? params.id : ''

  switch (route) {
    case Routes.CHECKLIST_DETAIL:
      store.dispatch(checklistDetailRequestData(id))
      store.dispatch(identityTypesRequestData())
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
