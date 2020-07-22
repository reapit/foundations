import { approvalsLoading, approvalsReceiveData, approvalsRequestData, approvalsClearData } from '../approvals'
import ActionTypes from '../../constants/action-types'
import { approvalsStub } from '@/sagas/approvals/__stubs__/approvals'

describe('adminApprovals actions', () => {
  it('should create a approvalsLoading action', () => {
    expect(approvalsLoading.type).toEqual(ActionTypes.APPROVALS_LOADING)
    expect(approvalsLoading(true).data).toEqual(true)
  })

  it('should create a approvalsReceiveData action', () => {
    expect(approvalsReceiveData.type).toEqual(ActionTypes.APPROVALS_RECEIVE_DATA)
    expect(approvalsReceiveData(approvalsStub).data).toEqual(approvalsStub)
  })

  it('should create a approvalsRequestData action', () => {
    expect(approvalsRequestData.type).toEqual(ActionTypes.APPROVALS_REQUEST_DATA)
    expect(approvalsRequestData(1).data).toEqual(1)
  })

  it('should create a approvalsClearData action', () => {
    expect(approvalsClearData.type).toEqual(ActionTypes.APPROVALS_CLEAR_DATA)
    expect(approvalsClearData(null).data).toEqual(null)
  })
})
