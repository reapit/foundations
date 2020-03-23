import revisionsReduer, { defaultState } from '../revisions'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'

describe('revisions reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = revisionsReduer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return loading true when REVISIONS_REQUEST_DATA action is called', () => {
    const newState = revisionsReduer(defaultState, {
      type: ActionTypes.REVISIONS_REQUEST_DATA as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should return revisions when REVISIONS_RECEIVE_DATA action is called', () => {
    const newState = revisionsReduer(defaultState, {
      type: ActionTypes.REVISIONS_RECEIVE_DATA as ActionType,
      data: revisionsDataStub,
    })
    const expected = {
      ...defaultState,
      revisions: revisionsDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading false when REVISIONS_REQUEST_DATA_FAILURE action is called', () => {
    const newState = revisionsReduer(defaultState, {
      type: ActionTypes.REVISIONS_REQUEST_DATA_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear revisions data when REVISIONS_CLEAR_DATA action is called', () => {
    const newState = revisionsReduer(defaultState, {
      type: ActionTypes.REVISIONS_CLEAR_DATA as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      revisions: null,
    }
    expect(newState).toEqual(expected)
  })
})
