import { approvalsReceiveData, fetchApprovalsData } from '../approvals'
import ActionTypes from '../../constants/action-types'
import { approvalsStub } from '@/sagas/approvals/__stubs__/approvals'

describe('adminApprovals actions', () => {
  it('should create a approvalsReceiveData action', () => {
    expect(approvalsReceiveData.type).toEqual(ActionTypes.APPROVALS_RECEIVE_DATA)
    expect(approvalsReceiveData(approvalsStub.data).data).toEqual(approvalsStub.data)
  })

  it('should create a fetchApprovalsData action', () => {
    expect(fetchApprovalsData.type).toEqual(ActionTypes.FETCH_APPROVALS_DATA)
    expect(fetchApprovalsData(1).data).toEqual(1)
  })
})
