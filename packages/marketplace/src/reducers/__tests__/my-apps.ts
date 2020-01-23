import myAppsReducer, { defaultState } from '../my-apps'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('my-apps reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = myAppsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when MY_APPS_LOADING action is called', () => {
    const newState = myAppsReducer(undefined, { type: ActionTypes.MY_APPS_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set my-apps item data when MY_APPS_RECEIVE_DATA action is called', () => {
    const newState = myAppsReducer(undefined, {
      type: ActionTypes.MY_APPS_RECEIVE_DATA as ActionType,
      data: appsDataStub,
    })
    const expected = {
      ...defaultState,
      myAppsData: appsDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear my-apps item data when MY_APPS_CLEAR_DATA action is called', () => {
    const newState = myAppsReducer(undefined, { type: ActionTypes.MY_APPS_CLEAR_DATA as ActionType, data: null })
    const expected = {
      ...defaultState,
      myAppsData: null,
    }
    expect(newState).toEqual(expected)
  })
})
