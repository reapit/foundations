import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultAppRevisionModel_ } from '@reapit/foundations-ts-definitions'

export interface RevisionsRequestParams {
  appId: string
  pageSize?: number
  pageNumber?: number
}

export const revisionsRequestData = actionCreator<RevisionsRequestParams>(ActionTypes.REVISIONS_REQUEST_DATA)
export const revisionsReceiveData = actionCreator<PagedResultAppRevisionModel_>(ActionTypes.REVISIONS_RECEIVE_DATA)
export const revisionsRequestDataFailure = actionCreator<void>(ActionTypes.REVISIONS_REQUEST_DATA_FAILURE)
export const revisionsClearData = actionCreator<null>(ActionTypes.REVISIONS_CLEAR_DATA)
