import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export const submitEmail = actionCreator<string>(ActionTypes.FORGOT_PASSWORD_SUBMIT_EMAIL)
export const forgotPasswordLoading = actionCreator<boolean>(ActionTypes.FORGOT_PASSWORD_LOADING)
