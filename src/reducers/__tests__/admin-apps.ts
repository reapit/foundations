import adminAppsReducer, { defaultState } from '../admin-apps'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('admin approvals reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = adminAppsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when ADMIN_APPS_REQUEST_DATA action is called', () => {
    const newState = adminAppsReducer(undefined, {
      type: ActionTypes.ADMIN_APPS_REQUEST_DATA as ActionType,
      data: { pageNumber: 1, appName: '1', developerName: '1' }
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when ADMIN_APPS_RECEIVE_DATA action is called', () => {
    const newState = adminAppsReducer(undefined, {
      type: ActionTypes.ADMIN_APPS_RECEIVE_DATA as ActionType,
      data: appsDataStub.data
    })
    const expected = {
      ...defaultState,
      adminAppsData: appsDataStub.data
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when ADMIN_APPS_REQUEST_FAILURE action is called', () => {
    const newState = adminAppsReducer(undefined, {
      type: ActionTypes.ADMIN_APPS_REQUEST_FAILURE as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      loading: false
    }
    expect(newState).toEqual(expected)
  })
})
