import { featureListReducer, defaultFeatureAppsListState } from '../feature-list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { featuredAppsDataStub } from '@/sagas/__stubs__/apps'

describe('appCategories reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = featureListReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultFeatureAppsListState)
  })

  it('should set state to test when FETCH_FEATURE_APPS action is called with test', () => {
    const newState = featureListReducer(undefined, {
      type: ActionTypes.FETCH_FEATURE_APPS as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultFeatureAppsListState,
      isLoading: true,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_FEATURE_APPS_SUCCESS action is called with test', () => {
    const newState = featureListReducer(undefined, {
      type: ActionTypes.FETCH_FEATURE_APPS_SUCCESS as ActionType,
      data: featuredAppsDataStub,
    })
    const expected = {
      ...defaultFeatureAppsListState,
      ...featuredAppsDataStub,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_FEATURE_APPS_FAILED action is called with test', () => {
    const newState = featureListReducer(undefined, {
      type: ActionTypes.FETCH_FEATURE_APPS_FAILED as ActionType,
      data: 'mockError',
    })
    const expected = {
      ...defaultFeatureAppsListState,
      isLoading: false,
      errorMessage: 'mockError',
    }
    expect(newState).toEqual(expected)
  })
})
