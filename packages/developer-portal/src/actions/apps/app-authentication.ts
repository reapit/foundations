import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { AppClientSecretModel } from '@/types/marketplace-api-schema'

export const fetchtAppAuthentication = actionCreator<string>(ActionTypes.FETCH_APP_AUTHENTICATION)
export const fetchtAppAuthenticationSuccess = actionCreator<AppClientSecretModel>(
  ActionTypes.FETCH_APP_AUTHENTICATION_SUCCESS,
)
export const fetchtAppAuthenticationFailed = actionCreator<string>(ActionTypes.FETCH_APP_AUTHENTICATION_FAILED)
export const clearAppAuthentication = actionCreator<void>(ActionTypes.CLEAR_APP_AUTHENTICATION)
