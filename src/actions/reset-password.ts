import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export type ResetPasswordParams = {
  email: string
  password: string
  confirmPassword: string
  verificationCode: string
}
export const resetPassword = actionCreator<ResetPasswordParams>(ActionTypes.RESET_PASSWORD)
export const resetPasswordLoading = actionCreator<boolean>(ActionTypes.RESET_PASSWORD_LOADING)
