import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'

export const fetchApprovalsData = actionCreator<number>(ActionTypes.FETCH_APPROVALS_DATA)
export const fetchApprovalsDataFailed = actionCreator<void>(ActionTypes.FETCH_APPROVALS_FAILED)

export const fetchApprovalsDataSuccess = actionCreator<PagedResultApprovalModel_>(
  ActionTypes.FETCH_APPROVALS_DATA_SUCCESS,
)
