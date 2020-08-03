import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchAppRevisionsByIdParams } from '@/services/apps'
import { AppRevisionModel } from '@reapit/foundations-ts-definitions'

export const fetchAppRevisionDetail = actionCreator<FetchAppRevisionsByIdParams>(ActionTypes.FETCH_APP_REVISION_DETAIL)
export const fetchAppRevisionDetailSuccess = actionCreator<AppRevisionModel>(
  ActionTypes.FETCH_APP_REVISION_DETAIL_SUCCESS,
)
export const fetchAppRevisionDetailFailed = actionCreator<string>(ActionTypes.FETCH_APP_REVISION_DETAIL_FAILED)
export const clearAppRevisionDetail = actionCreator<void>(ActionTypes.CLEAR_APP_REVISION_DETAIL)
