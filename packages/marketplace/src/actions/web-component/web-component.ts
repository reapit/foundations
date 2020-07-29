import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import {
  FetchWebComponentConfigParams,
  UpdateWebComponentConfigParams,
  WebComponentConfigResult,
} from '@/services/web-component'

export const fetchWebComponentConfig = actionCreator<FetchWebComponentConfigParams>(
  ActionTypes.FETCH_WEB_COMPONENT_CONFIG,
)
export const fetchWebComponentConfigSuccess = actionCreator<WebComponentConfigResult>(
  ActionTypes.FETCH_WEB_COMPONENT_CONFIG_SUCCESS,
)
export const fetchWebComponentConfigFailed = actionCreator<string>(ActionTypes.FETCH_WEB_COMPONENT_CONFIG_FAILED)

export const updateWebComponentConfig = actionCreator<UpdateWebComponentConfigParams>(
  ActionTypes.UPDATE_WEB_COMPONENT_CONFIG,
)
export const updateWebComponentConfigSuccess = actionCreator<void>(ActionTypes.UPDATE_WEB_COMPONENT_CONFIG_SUCCESS)
export const updateWebComponentConfigFailed = actionCreator<string>(ActionTypes.UPDATE_WEB_COMPONENT_CONFIG_FAILED)
