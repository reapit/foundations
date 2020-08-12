import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'

export const settingLoadingVisibility = actionCreator<boolean>(ActionTypes.SETTING_LOADING_VISIBILITY)

export type ChangePasswordParams = {
  currentPassword: string
  password: string
  confirmPassword: string
  email: string
}
export const changePassword = actionCreator<ChangePasswordParams>(ActionTypes.CHANGE_PASSWORD)
