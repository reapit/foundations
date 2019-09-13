import { RouteValue, StringMap } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { homeRequestData } from '../actions/home'
import { checklistDetailRequestData } from '@/actions/checklist-detail'

// @ts-ignore
const routeDispatcher = async (route: RouteValue, params?: StringMap) => {
  const id = params ? params.id : ''
  switch (route) {
    case Routes.HOME:
      store.dispatch(homeRequestData())
      break
    case Routes.CHECKLIST_DETAIL:
      store.dispatch(checklistDetailRequestData(id))
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
