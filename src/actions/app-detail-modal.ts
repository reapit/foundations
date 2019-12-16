import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const setAppDetailModalStateBrowse = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_BROWSE)
export const setAppDetailModalStateInstall = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_INSTALL)
export const setAppDetailModalStateUninstall = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_UNINSTALL)
export const setAppDetailModalStateSuccess = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_SUCCESS)
export const setAppDetailModalStateManage = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_MANAGE)
