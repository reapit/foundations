import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ApproveModel, RejectRevisionModel } from '@reapit/foundations-ts-definitions'
import { FormState } from '@/types/core'

export interface RevisionDetailRequestParams {
  appId: string
  appRevisionId: string
  callback?: () => void
}

export type RevisionApproveRequestParams = RevisionDetailRequestParams & ApproveModel
export type RevisionDeclineRequestParams = RevisionDetailRequestParams & RejectRevisionModel

export const declineRevision = actionCreator<RevisionDeclineRequestParams>(ActionTypes.REVISION_SUBMIT_DECLINE)
export const declineRevisionSetFormState = actionCreator<FormState>(ActionTypes.REVISION_DECLINE_SET_FORM_STATE)
