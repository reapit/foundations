import resultReducer, { defaultState } from '../result'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { resultDataStub } from '@/sagas/__stubs__/result'

describe('result reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = resultReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when RESULT_REQUEST_DATA action is called', () => {
    const newState = resultReducer(undefined, {
      type: ActionTypes.RESULT_REQUEST_DATA as ActionType,
      data: {}
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set contacts list data when RESULT_RECEIVE_DATA action is called', () => {
    const newState = resultReducer(undefined, {
      type: ActionTypes.RESULT_RECEIVE_DATA as ActionType,
      data: resultDataStub
    })
    const expected = {
      ...defaultState,
      loading: false,
      contacts: resultDataStub
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when RESULT_REQUEST_FAILURE action is called', () => {
    const newState = resultReducer(undefined, {
      type: ActionTypes.RESULT_REQUEST_FAILURE as ActionType,
      data: {}
    })
    const expected = {
      ...defaultState,
      loading: false
    }
    expect(newState).toEqual(expected)
  })
})
