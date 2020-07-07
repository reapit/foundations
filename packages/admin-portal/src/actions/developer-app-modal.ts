import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const setDeveloperAppModalStateEditDetail = actionCreator<void>(
  ActionTypes.SET_DEVELOPER_APP_MODAL_STATE_EDIT_DETAIL,
)
export const setDeveloperAppModalStateDelete = actionCreator<void>(ActionTypes.SET_DEVELOPER_APP_MODAL_STATE_DELETE)
export const setDeveloperAppModalStateViewDetail = actionCreator<void>(
  ActionTypes.SET_DEVELOPER_APP_MODAL_STATE_VIEW_DETAIL,
)
export const developerAppShowModal = actionCreator<boolean>(ActionTypes.DEVELOPER_SHOW_MODAL)
