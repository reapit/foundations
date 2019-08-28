import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const setAppDetailModalStateView = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_VIEW)
export const setAppDetailModalStatePermission = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_PERMISSION)
export const setAppDetailModalStateViewConfirm = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_CONFIRM)
export const setAppDetailModalStateInstallSuccess = actionCreator<void>(ActionTypes.SET_APP_DETAIL_MODAL_STATE_SUCCESS)
