import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultAppSummaryModel_ } from '@/types/marketplace-api-schema'
import { FormState } from '@/types/core'

export interface AdminAppsFilter {
  appName: string
  companyName: string
  developerName: string
}

export type AdminAppsParams = {
  pageNumber: number
} & AdminAppsFilter

export type AdminAppsFeaturedParams = {
  id: string
  isFeatured: boolean
}

export const adminAppsRequestData = actionCreator<AdminAppsParams>(ActionTypes.ADMIN_APPS_REQUEST_DATA)
export const adminAppsReceiveData = actionCreator<PagedResultAppSummaryModel_>(ActionTypes.ADMIN_APPS_RECEIVE_DATA)
export const adminAppsRequestFailure = actionCreator<void>(ActionTypes.ADMIN_APPS_REQUEST_FAILURE)
export const adminAppsRequestFeatured = actionCreator<AdminAppsFeaturedParams>(ActionTypes.ADMIN_APPS_REQUEST_FEATURED)
export const adminAppsSetFormState = actionCreator<FormState>(ActionTypes.ADMIN_APPS_SET_FORM_STATE)
