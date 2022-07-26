import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppDetailItem } from '@/reducers/apps/detail'

export interface AppDetailParams {
  id: string
  clientId?: string
}

export const fetchAppDetail = actionCreator<AppDetailParams>(ActionTypes.FETCH_APP_DETAIL)

export const fetchAppDetailSuccess = actionCreator<{ data: AppDetailItem } | undefined>(
  ActionTypes.FETCH_APP_DETAIL_SUCCESS,
)
export const fetchAppDetailFailed = actionCreator<string | void>(ActionTypes.FETCH_APP_DETAIL_FAILED)
