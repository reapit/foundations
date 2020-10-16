import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export type AppsFeaturedParams = {
  id: string
  isFeatured: boolean
}

export type AppsParams = {
  pageNumber?: number
  appName?: string
  developerName?: string
  companyName?: string
}

export const fetchAppList = actionCreator<AppsParams>(ActionTypes.FETCH_APP_LIST)
export const fetchAppListSuccess = actionCreator<AppSummaryModelPagedResult>(ActionTypes.FETCH_APP_LIST_SUCCESS)
export const fetchAppListFailed = actionCreator<string>(ActionTypes.FETCH_APP_LIST_FAILED)
export const requestMarkAppAsFeatured = actionCreator<AppsFeaturedParams>(ActionTypes.REQUEST_MARK_APP_AS_FEATURED)
