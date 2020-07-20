import approvalsReducer, { defaultState } from '../approvals'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { approvalsStub } from '@/sagas/approvals/__stubs__/approvals'

describe('Approvals reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = approvalsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APPROVALS_LOADING action is called', () => {
    const newState = approvalsReducer(undefined, {
      type: ActionTypes.APPROVALS_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when APPROVALS_RECEIVE_DATA action is called', () => {
    const newState = approvalsReducer(undefined, {
      type: ActionTypes.APPROVALS_RECEIVE_DATA as ActionType,
      data: approvalsStub,
    })
    const expected = {
      ...defaultState,
      approvalsData: approvalsStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when APPROVALS_CLEAR_DATA action is called', () => {
    const newState = approvalsReducer(undefined, {
      type: ActionTypes.APPROVALS_CLEAR_DATA as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      approvalsData: null,
    }
    expect(newState).toEqual(expected)
  })
})
