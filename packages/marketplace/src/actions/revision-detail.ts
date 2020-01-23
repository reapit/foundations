import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { RevisionDetailItem } from '../reducers/revision-detail'
import { ApproveModel, RejectRevisionModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'

export interface RevisionDetailRequestParams {
  appId: string
  appRevisionId: string
}

export interface RevisionReceiveDataParams extends RevisionDetailItem {
  scopes: ScopeModel[]
}

export type RevisionApproveRequestParams = RevisionDetailRequestParams & ApproveModel
export type RevisionDeclineRequestParams = RevisionDetailRequestParams & RejectRevisionModel

export const revisionDetailRequestData = actionCreator<RevisionDetailRequestParams>(
  ActionTypes.REVISION_DETAIL_REQUEST_DATA
)
export const revisionDetailLoading = actionCreator<boolean>(ActionTypes.REVISION_DETAIL_LOADING)
export const revisionDetailReceiveData = actionCreator<RevisionReceiveDataParams>(
  ActionTypes.REVISION_DETAIL_RECEIVE_DATA
)
export const revisionDetailFailure = actionCreator<void>(ActionTypes.REVISION_DETAIL_REQUEST_DATA__FAILURE)
export const revisionDetailClearData = actionCreator<null>(ActionTypes.REVISION_DETAIL_CLEAR_DATA)

export const approveRevision = actionCreator<RevisionApproveRequestParams>(ActionTypes.REVISION_SUBMIT_APPROVE)
export const approveRevisionSetFormState = actionCreator<FormState>(ActionTypes.REVISION_APPROVE_SET_FORM_STATE)

export const declineRevision = actionCreator<RevisionDeclineRequestParams>(ActionTypes.REVISION_SUBMIT_DECLINE)
export const declineRevisionSetFormState = actionCreator<FormState>(ActionTypes.REVISION_DECLINE_SET_FORM_STATE)
