import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { AppClientSecretModel } from '@/types/marketplace-api-schema'

export const fetchtAppAuthentication = actionCreator<string>(ActionTypes.REQUEST_AUTHENTICATION_CODE)
export const fetchtAppAuthenticationSuccess = actionCreator<AppClientSecretModel>(
  ActionTypes.REQUEST_AUTHENTICATION_CODE_SUCCESS,
)
export const fetchtAppAuthenticationFailed = actionCreator<void>(ActionTypes.REQUEST_AUTHENTICATION_CODE_FAILURE)
export const clearAppAuthentication = actionCreator<void>(ActionTypes.REMOVE_AUTHENTICATION_CODE)
