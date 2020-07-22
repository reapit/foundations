import appSummaryReducer, { defaultState } from '../app-summary'
import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { appsDataStub, featuredAppsDataStub } from '../../../sagas/__stubs__/apps'

describe('appsumar reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appSummaryReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when CLIENT_FETCH_APP_SUMMARY action is called', () => {
    const newState = appSummaryReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_APP_SUMMARY as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isAppSummaryLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set client item data when CLIENT_FETCH_APP_SUMMARY_SUCCESS action is called', () => {
    const newState = appSummaryReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_APP_SUMMARY_SUCCESS as ActionType,
      data: {
        apps: appsDataStub.data,
        featuredApps: featuredAppsDataStub.data,
      },
    })
    const expected = {
      ...defaultState,
      isAppSummaryLoading: false,
      data: {
        apps: appsDataStub.data,
        featuredApps: featuredAppsDataStub.data,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set error data when CLIENT_FETCH_APP_SUMMARY_FAILED action is called', () => {
    const newState = appSummaryReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_APP_SUMMARY_FAILED as ActionType,
      data: 'error',
    })
    const expected = {
      ...defaultState,
      isAppSummaryLoading: false,
      error: 'error',
    }
    expect(newState).toEqual(expected)
  })

  it('should clear client item data when CLIENT_CLEAR_APP_SUMMARY action is called', () => {
    const newState = appSummaryReducer(undefined, {
      type: ActionTypes.CLIENT_CLEAR_APP_SUMMARY as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      data: null,
    }
    expect(newState).toEqual(expected)
  })
})
