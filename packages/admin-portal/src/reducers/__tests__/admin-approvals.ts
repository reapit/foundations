import adminApprovalsReducer, { defaultState } from '../admin-approvals'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { approvalsStub } from '../../sagas/__stubs__/approvals'

describe('admin approvals reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = adminApprovalsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when ADMIN_APPROVALS_LOADING action is called', () => {
    const newState = adminApprovalsReducer(undefined, {
      type: ActionTypes.ADMIN_APPROVALS_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when ADMIN_APPROVALS_RECEIVE_DATA action is called', () => {
    const newState = adminApprovalsReducer(undefined, {
      type: ActionTypes.ADMIN_APPROVALS_RECEIVE_DATA as ActionType,
      data: approvalsStub,
    })
    const expected = {
      ...defaultState,
      adminApprovalsData: approvalsStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when ADMIN_APPROVALS_CLEAR_DATA action is called', () => {
    const newState = adminApprovalsReducer(undefined, {
      type: ActionTypes.ADMIN_APPROVALS_CLEAR_DATA as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      adminApprovalsData: null,
    }
    expect(newState).toEqual(expected)
  })
})
