import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { RevisionDetailItem } from '@/reducers/apps/revisions'
import { ApproveModel, RejectRevisionModel, ScopeModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'

export interface RevisionDetailRequestParams {
  appId: string
  appRevisionId: string
  callback?: () => void
}

export interface RevisionReceiveDataParams extends RevisionDetailItem {
  scopes: ScopeModel[]
}

export type RevisionApproveRequestParams = RevisionDetailRequestParams & ApproveModel
export type RevisionDeclineRequestParams = RevisionDetailRequestParams & RejectRevisionModel

export const fetchRevisionData = actionCreator<RevisionDetailRequestParams>(ActionTypes.FETCH_REVISION_DATA)

export const fetchRevisionDataSuccess = actionCreator<RevisionReceiveDataParams>(
  ActionTypes.FETCH_REVISION_DATA_SUCCESS,
)
export const fetchRevisionDataFailed = actionCreator<void>(ActionTypes.FETCH_REVISION_DATA__FAILURE)

export const requestApproveRevision = actionCreator<RevisionApproveRequestParams>(ActionTypes.REQUEST_APPROVE_REVISION)

export const setRequestApproveRevisionFormState = actionCreator<FormState>(
  ActionTypes.SET_REQUEST_APPROVE_REVISION_FORM_STATE,
)

export const requestDeclineRevision = actionCreator<RevisionDeclineRequestParams>(ActionTypes.REQUEST_DECLINE_REVISION)

export const setRequestDeclineRevisionFormState = actionCreator<FormState>(
  ActionTypes.SET_REQUEST_DECLINE_REVISION_FORM_STATE,
)
