import appListReducer, { defaultState, AppListState } from '../app-list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appsDataStub } from '@/sagas/__stubs__/apps'

describe('app-list reducer', () => {
  it('should set loading when FETCH_APP_LIST action is called', () => {
    const newState = appListReducer(undefined, {
      type: ActionTypes.FETCH_APP_LIST as ActionType,
      data: null,
    })
    const expected: AppListState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })
  it('should set data when FETCH_APP_LIST_SUCCESS action is called', () => {
    const newState = appListReducer(undefined, {
      type: ActionTypes.FETCH_APP_LIST_SUCCESS as ActionType,
      data: appsDataStub.data,
    })
    const { data, pageNumber, pageSize, totalCount } = appsDataStub.data
    const expected: AppListState = {
      ...defaultState,
      data,
      totalCount,
      pageSize,
      page: pageNumber,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
  it('should set error message when FETCH_APP_LIST_FAILED action is called', () => {
    const newState = appListReducer(undefined, {
      type: ActionTypes.FETCH_APP_LIST_FAILED as ActionType,
      data: 'test',
    })
    const expected: AppListState = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })
  it('should remove auth code when CLEAR_APP_LIST action is called', () => {
    const newState = appListReducer(undefined, {
      type: ActionTypes.CLEAR_APP_LIST as ActionType,
      data: null,
    })
    expect(newState).toEqual(defaultState)
  })
})
