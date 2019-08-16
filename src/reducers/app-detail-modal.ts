import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  setAppDetailModalStateView,
  setAppDetailModalStatePermission,
  setAppDetailModalStateViewConfirm
} from '../actions/app-detail-modal'

export type AppDetailModalState = 'VIEW_DETAIL' | 'VIEW_PERMISSION' | 'VIEW_CONFIRM_INSTALL'

export const defaultState: AppDetailModalState = 'VIEW_DETAIL'

const appDetailModalReducer = (state: AppDetailModalState = defaultState, action: Action<any>): AppDetailModalState => {
  if (isType(action, setAppDetailModalStateView)) {
    return 'VIEW_DETAIL'
  }

  if (isType(action, setAppDetailModalStatePermission)) {
    return 'VIEW_PERMISSION'
  }

  if (isType(action, setAppDetailModalStateViewConfirm)) {
    return 'VIEW_CONFIRM_INSTALL'
  }

  return state
}

export default appDetailModalReducer
