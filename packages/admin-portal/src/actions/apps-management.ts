import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultAppSummaryModel_ } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'

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

export const appsRequestData = actionCreator<AppsParams>(ActionTypes.APPS_REQUEST_DATA)
export const appsReceiveData = actionCreator<PagedResultAppSummaryModel_>(ActionTypes.APPS_RECEIVE_DATA)
export const appsRequestFailure = actionCreator<void>(ActionTypes.APPS_REQUEST_FAILURE)
export const appsRequestFeatured = actionCreator<AppsFeaturedParams>(ActionTypes.APPS_REQUEST_FEATURED)
export const appsSetFormState = actionCreator<FormState>(ActionTypes.APPS_SET_FORM_STATE)
