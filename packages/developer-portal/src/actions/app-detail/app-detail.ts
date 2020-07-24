import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchAppByIdParams } from '@/services/apps'
import { AppDetailData } from '@/reducers/developer'

export interface AppDetailParams {
  id: string
  clientId?: string
}

export const fetchAppDetail = actionCreator<FetchAppByIdParams>(ActionTypes.FETCH_APP_DETAIL)
export const fetchAppDetailSuccess = actionCreator<AppDetailData>(ActionTypes.FETCH_APP_DETAIL_SUCCESS)
export const fetchAppDetailFailed = actionCreator<string>(ActionTypes.FETCH_APP_DETAIL_FAILED)
export const clearAppDetail = actionCreator<string>(ActionTypes.CLEAR_APP_DETAIL)
