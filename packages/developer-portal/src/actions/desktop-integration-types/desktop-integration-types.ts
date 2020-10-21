import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { DesktopIntegrationTypeModelPagedResult } from '@reapit/foundations-ts-definitions'

export const fetchDesktopIntegrationTypeList = actionCreator<void>(ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST)
export const fetchDesktopIntegrationTypeListSuccess = actionCreator<DesktopIntegrationTypeModelPagedResult>(
  ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST_SUCCESS,
)
export const fetchDesktopIntegrationTypeListFailed = actionCreator<string>(
  ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPE_LIST_FAILED,
)
