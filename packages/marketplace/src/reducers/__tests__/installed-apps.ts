import installedAppsReducer, { defaultState } from '../installed-apps'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('installed-apps reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = installedAppsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when INSTALLED_APPS_LOADING action is called', () => {
    const newState = installedAppsReducer(undefined, {
      type: ActionTypes.INSTALLED_APPS_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set installed-apps item data when INSTALLED_APPS_RECEIVE_DATA action is called', () => {
    const newState = installedAppsReducer(undefined, {
      type: ActionTypes.INSTALLED_APPS_RECEIVE_DATA as ActionType,
      data: appsDataStub,
    })
    const expected = {
      ...defaultState,
      installedAppsData: appsDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear installed-apps item data when INSTALLED_APPS_CLEAR_DATA action is called', () => {
    const newState = installedAppsReducer(undefined, {
      type: ActionTypes.INSTALLED_APPS_CLEAR_DATA as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      installedAppsData: null,
    }
    expect(newState).toEqual(expected)
  })
})
