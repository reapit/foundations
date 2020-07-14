import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { ApprovalsList } from '@/reducers/approvals'

export const approvalsRequestData = actionCreator<number>(ActionTypes.APPROVALS_REQUEST_DATA)
export const approvalsRequestDataFailure = actionCreator<void>(ActionTypes.APPROVALS_REQUEST_FAILURE)
export const approvalsLoading = actionCreator<boolean>(ActionTypes.APPROVALS_LOADING)
export const approvalsReceiveData = actionCreator<ApprovalsList | undefined>(ActionTypes.APPROVALS_RECEIVE_DATA)
export const approvalsClearData = actionCreator<null>(ActionTypes.APPROVALS_CLEAR_DATA)
