import { defaultAppsListState, appsListReducer } from '../list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appsDataStub } from '@/sagas/__stubs__/apps'

describe('appList reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appsListReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultAppsListState)
  })

  it('should set state correctly when fetchAppsSuccess', () => {
    const newState = appsListReducer(undefined, {
      type: ActionTypes.FETCH_APPS_SUCESS as ActionType,
      data: appsDataStub,
    })
    const expected = {
      ...defaultAppsListState,
      ...appsDataStub,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state correctly when fetchAppsFailed', () => {
    const newState = appsListReducer(undefined, {
      type: ActionTypes.FETCH_APPS_FAILED as ActionType,
      data: 'error',
    })

    const expected = {
      ...defaultAppsListState,
      isLoading: false,
      errorMessage: 'error',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state correctly when fetchAppsInfiniteSuccess', () => {
    const newState = appsListReducer(undefined, {
      type: ActionTypes.FETCH_APPS_INFINITE_SUCESS as ActionType,
      data: appsDataStub,
    })

    const expected = {
      ...defaultAppsListState,
      ...appsDataStub,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })
})
