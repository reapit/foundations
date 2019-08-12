import appPermissionReducer, { defaultState } from '../app-permission'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

const testData = {
  loading: { ...defaultState, loading: true }
}

describe('app-permission reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appPermissionReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APP_PERMISION_LOADING action is called', () => {
    const newState = appPermissionReducer(defaultState, {
      type: ActionTypes.APP_PERMISION_LOADING as ActionType,
      data: true
    })
    expect(newState).toEqual(testData.loading)
  })

  it('should set app-permission item and set error and loading to false data when APP_PERMISION_RECEIVE_DATA action is called', () => {
    const newState = appPermissionReducer(
      { ...testData.loading, error: true },
      {
        type: ActionTypes.APP_PERMISION_RECEIVE_DATA as ActionType,
        data: appsDataStub
      }
    )
    const expected = {
      ...defaultState,
      appPermissionData: appsDataStub,
      error: false,
      loading: false
    }
    expect(newState).toEqual(expected)
  })

  it('should set app-permission error to true when ', () => {
    const newState = appPermissionReducer(testData.loading, {
      type: ActionTypes.APP_PERMISION_REQUEST_DATA_FAILURE as ActionType,
      data: appsDataStub
    })
    const expected = {
      ...defaultState,
      error: true,
      loading: false
    }
    expect(newState).toEqual(expected)
  })
})
