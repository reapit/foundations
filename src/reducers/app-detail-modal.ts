import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { setAppDetailModalStateView, setAppDetailModalStatePermission } from '../actions/app-detail-modal'

export type AppDetailModalState = 'VIEW_DETAIL' | 'VIEW_PERMISSION'

export const defaultState: AppDetailModalState = 'VIEW_DETAIL'

const developerReducer = (state: AppDetailModalState = defaultState, action: Action<any>): AppDetailModalState => {
  if (isType(action, setAppDetailModalStateView)) {
    return 'VIEW_DETAIL'
  }

  if (isType(action, setAppDetailModalStatePermission)) {
    return 'VIEW_PERMISSION'
  }

  return state
}

export default developerReducer
