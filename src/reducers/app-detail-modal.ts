import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  setAppDetailModalStateView,
  setAppDetailModalStatePermission,
  setAppDetailModalStateViewConfirm,
  setAppDetailModalStateInstallSuccess
} from '../actions/app-detail-modal'

export type AppDetailModalState = 'VIEW_DETAIL' | 'VIEW_PERMISSION' | 'VIEW_CONFIRM_INSTALL' | 'VIEW_INSTALL_SUCCESS'

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

  if (isType(action, setAppDetailModalStateInstallSuccess)) {
    return 'VIEW_INSTALL_SUCCESS'
  }

  return state
}

export default appDetailModalReducer
