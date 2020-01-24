import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export const requestDeveloperData = actionCreator<void>(ActionTypes.SETTING_FETCH_DEVELOPER_INFO)
export const requestDeveloperDataSuccess = actionCreator<DeveloperModel>(
  ActionTypes.SETTING_FETCH_DEVELOPER_INFO_SUCCESS,
)
export const settingShowLoading = actionCreator<boolean>(ActionTypes.SETTING_SHOW_HIDE_LOADING)
export const updateDeveloperData = actionCreator<DeveloperModel>(ActionTypes.SETTING_UPDATE_DEVELOPER)

export type ChangePasswordParams = {
  currentPassword: string
  password: string
  confirmPassword: string
}
export const changePassword = actionCreator<ChangePasswordParams>(ActionTypes.CHANGE_PASSWORD)
