import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AdminApprovalsList } from '../reducers/admin-approvals'

export const adminApprovalsRequestData = actionCreator<number>(ActionTypes.ADMIN_APPROVALS_REQUEST_DATA)
export const adminApprovalsRequestDataFailure = actionCreator<void>(ActionTypes.ADMIN_APPROVALS_REQUEST_FAILURE)
export const adminApprovalsLoading = actionCreator<boolean>(ActionTypes.ADMIN_APPROVALS_LOADING)
export const adminApprovalsReceiveData = actionCreator<AdminApprovalsList | undefined>(
  ActionTypes.ADMIN_APPROVALS_RECEIVE_DATA
)
export const adminApprovalsClearData = actionCreator<null>(ActionTypes.ADMIN_APPROVALS_CLEAR_DATA)
