import appsManagementReducer, { defaultState } from '../apps-management'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('appsManagement reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appsManagementReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APPS_REQUEST_DATA action is called', () => {
    const newState = appsManagementReducer(undefined, {
      type: ActionTypes.APPS_REQUEST_DATA as ActionType,
      data: { pageNumber: 1, appName: '1', companyName: '1', developerName: '1' },
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when APPS_RECEIVE_DATA action is called', () => {
    const newState = appsManagementReducer(undefined, {
      type: ActionTypes.APPS_RECEIVE_DATA as ActionType,
      data: appsDataStub.data,
    })
    const expected = {
      ...defaultState,
      appsData: appsDataStub.data,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when APPS_REQUEST_FAILURE action is called', () => {
    const newState = appsManagementReducer(undefined, {
      type: ActionTypes.APPS_REQUEST_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
})
