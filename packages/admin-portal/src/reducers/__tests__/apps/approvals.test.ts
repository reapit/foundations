import appReducer, { defaultState } from '../../apps'
import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { approvalsStub } from '@/sagas/approvals/__stubs__/approvals'

describe('appReduce - approvals', () => {
  it('should set loading to true when FETCH_APPROVAL_LIST action is called', () => {
    const newState = appReducer(undefined, {
      type: ActionTypes.FETCH_APPROVAL_LIST as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      approvals: {
        ...defaultState.approvals,
        isLoading: true,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when FETCH_APPROVAL_LIST_SUCCESS action is called', () => {
    const newState = appReducer(undefined, {
      type: ActionTypes.FETCH_APPROVAL_LIST_SUCCESS as ActionType,
      data: approvalsStub.data,
    })
    const expected = {
      ...defaultState,
      approvals: {
        ...defaultState.approvals,
        ...approvalsStub.data,
      },
    }
    expect(newState).toEqual(expected)
  })
})
