import { fetchApprovalListSuccess, fetchApprovalList } from '../approvals'
import ActionTypes from '../../constants/action-types'
import { approvalsStub } from '@/sagas/approvals/__stubs__/approvals'

describe('adminApprovals actions', () => {
  it('should create a fetchApprovalListSuccess action', () => {
    expect(fetchApprovalListSuccess.type).toEqual(ActionTypes.FETCH_APPROVAL_LIST_SUCCESS)
    expect(fetchApprovalListSuccess(approvalsStub.data).data).toEqual(approvalsStub.data)
  })

  it('should create a fetchApprovalList action', () => {
    expect(fetchApprovalList.type).toEqual(ActionTypes.FETCH_APPROVAL_LIST)
    expect(fetchApprovalList(1).data).toEqual(1)
  })
})
