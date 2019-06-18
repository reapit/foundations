import homeReducer, { defaultState } from '../home'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { homeDataStub } from '../../sagas/__stubs__/home'

describe('home reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = homeReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when HOME_LOADING action is called', () => {
    const newState = homeReducer(undefined, { type: ActionTypes.HOME_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set home item data when HOME_RECEIVE_DATA action is called', () => {
    const newState = homeReducer(undefined, { type: ActionTypes.HOME_RECEIVE_DATA as ActionType, data: homeDataStub })
    const expected = {
      ...defaultState,
      homeData: homeDataStub
    }
    expect(newState).toEqual(expected)
  })

  it('should clear home item data when HOME_CLEAR_DATA action is called', () => {
    const newState = homeReducer(undefined, { type: ActionTypes.HOME_CLEAR_DATA as ActionType, data: null })
    const expected = {
      ...defaultState,
      homeData: null
    }
    expect(newState).toEqual(expected)
  })
})
