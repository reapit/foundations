import appDetailReducer, { defaultState } from '../app-detail'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('app-detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APP_DETAIL_LOADING action is called', () => {
    const newState = appDetailReducer(undefined, { type: ActionTypes.FETCH_APP_DETAIL as ActionType, data: true })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when APP_DETAIL_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL_FAILED as ActionType,
      data: 'test',
    })
    const expected = {
      ...defaultState,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when APP_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL_SUCCESS as ActionType,
      data: appDetailDataStub,
    })
    const expected = {
      ...defaultState,
      data: appDetailDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear app-detail item data when APP_DETAIL_CLEAR_DATA action is called', () => {
    const newState = appDetailReducer(undefined, { type: ActionTypes.CLEAR_APP_DETAIL as ActionType, data: null })
    const expected = {
      ...defaultState,
      data: null,
    }
    expect(newState).toEqual(expected)
  })
})
