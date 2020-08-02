import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultApprovalModel_ } from '@reapit/foundations-ts-definitions'

export const fetchApprovalList = actionCreator<number>(ActionTypes.FETCH_APPROVAL_LIST)
export const fetchApprovalListFailed = actionCreator<void>(ActionTypes.FETCH_APPROVAL_LIST_FAILED)

export const fetchApprovalListSuccess = actionCreator<PagedResultApprovalModel_>(
  ActionTypes.FETCH_APPROVAL_LIST_SUCCESS,
)
