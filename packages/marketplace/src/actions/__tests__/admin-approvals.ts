import {
  adminApprovalsLoading,
  adminApprovalsReceiveData,
  adminApprovalsRequestData,
  adminApprovalsClearData
} from '../admin-approvals'
import ActionTypes from '../../constants/action-types'
import { approvalsStub } from '../../sagas/__stubs__/approvals'

describe('adminApprovals actions', () => {
  it('should create a adminApprovalsLoading action', () => {
    expect(adminApprovalsLoading.type).toEqual(ActionTypes.ADMIN_APPROVALS_LOADING)
    expect(adminApprovalsLoading(true).data).toEqual(true)
  })

  it('should create a adminApprovalsReceiveData action', () => {
    expect(adminApprovalsReceiveData.type).toEqual(ActionTypes.ADMIN_APPROVALS_RECEIVE_DATA)
    expect(adminApprovalsReceiveData(approvalsStub).data).toEqual(approvalsStub)
  })

  it('should create a adminApprovalsRequestData action', () => {
    expect(adminApprovalsRequestData.type).toEqual(ActionTypes.ADMIN_APPROVALS_REQUEST_DATA)
    expect(adminApprovalsRequestData(1).data).toEqual(1)
  })

  it('should create a adminApprovalsClearData action', () => {
    expect(adminApprovalsClearData.type).toEqual(ActionTypes.ADMIN_APPROVALS_CLEAR_DATA)
    expect(adminApprovalsClearData(null).data).toEqual(null)
  })
})
