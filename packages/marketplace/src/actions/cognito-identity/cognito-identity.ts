import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'

export type ChangePasswordParams = {
  currentPassword: string
  password: string
  confirmPassword: string
  email: string
}
export const changePassword = actionCreator<ChangePasswordParams>(ActionTypes.CHANGE_PASSWORD)

export const changePasswordSuccess = actionCreator<void>(ActionTypes.CHANGE_PASSWORD_SUCCESS)

export const changePasswordFailed = actionCreator<string>(ActionTypes.CHANGE_PASSWORD_FAILED)
