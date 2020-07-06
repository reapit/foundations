import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  setAppDetailModalStateBrowse,
  setAppDetailModalStateInstall,
  setAppDetailModalStateSuccess,
  setAppDetailModalStateUninstall,
  setAppDetailModalStateManage,
} from '../actions/app-detail-modal'

export type AppDetailModalState =
  | 'VIEW_DETAIL_BROWSE'
  | 'VIEW_DETAIL_MANAGE'
  | 'VIEW_CONFIRM_INSTALL'
  | 'VIEW_CONFIRM_UNINSTALL'
  | 'VIEW_DETAIL_ACTION_SUCCESS'

export const defaultState: AppDetailModalState = 'VIEW_DETAIL_BROWSE'

const appDetailModalReducer = (state: AppDetailModalState = defaultState, action: Action<any>): AppDetailModalState => {
  if (isType(action, setAppDetailModalStateBrowse)) {
    return 'VIEW_DETAIL_BROWSE'
  }

  if (isType(action, setAppDetailModalStateManage)) {
    return 'VIEW_DETAIL_MANAGE'
  }

  if (isType(action, setAppDetailModalStateInstall)) {
    return 'VIEW_CONFIRM_INSTALL'
  }

  if (isType(action, setAppDetailModalStateSuccess)) {
    return 'VIEW_DETAIL_ACTION_SUCCESS'
  }

  if (isType(action, setAppDetailModalStateUninstall)) {
    return 'VIEW_CONFIRM_UNINSTALL'
  }

  return state
}

export default appDetailModalReducer
