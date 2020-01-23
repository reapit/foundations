import clientReducer, { defaultState } from '../client'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('client reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = clientReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when CLIENT_LOADING action is called', () => {
    const newState = clientReducer(undefined, { type: ActionTypes.CLIENT_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set client item data when CLIENT_RECEIVE_DATA action is called', () => {
    const newState = clientReducer(undefined, {
      type: ActionTypes.CLIENT_RECEIVE_DATA as ActionType,
      data: appsDataStub
    })
    const expected = {
      ...defaultState,
      clientData: appsDataStub
    }
    expect(newState).toEqual(expected)
  })

  it('should clear client item data when CLIENT_CLEAR_DATA action is called', () => {
    const newState = clientReducer(undefined, { type: ActionTypes.CLIENT_CLEAR_DATA as ActionType, data: null })
    const expected = {
      ...defaultState,
      clientData: null
    }
    expect(newState).toEqual(expected)
  })
})
