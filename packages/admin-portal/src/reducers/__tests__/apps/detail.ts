import appsReducer, { defaultState } from '@/reducers/apps/detail'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'

describe('app-detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APP_DETAIL_LOADING action is called', () => {
    const newState = appsReducer(undefined, { type: ActionTypes.APP_DETAIL_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when APP_DETAIL_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when APP_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = appsReducer(undefined, {
      type: ActionTypes.APP_DETAIL_RECEIVE_DATA as ActionType,
      data: appDetailDataStub,
    })
    const expected = {
      ...defaultState,
      data: appDetailDataStub.data,
    }
    expect(newState).toEqual(expected)
  })
})
