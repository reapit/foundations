import appDetailReducer, { defaultState } from '../app-detail'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appDetailDataStub } from '../../sagas/__stubs__/app-detail'

describe('app-detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APP_DETAIL_LOADING action is called', () => {
    const newState = appDetailReducer(undefined, { type: ActionTypes.APP_DETAIL_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when APP_DETAIL_FAILURE action is called', () => {
    const newState = appDetailReducer(undefined, { type: ActionTypes.APP_DETAIL_FAILURE as ActionType, data: true })
    const expected = {
      ...defaultState,
      error: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when APP_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.APP_DETAIL_RECEIVE_DATA as ActionType,
      data: appDetailDataStub
    })
    const expected = {
      ...defaultState,
      appDetailData: appDetailDataStub
    }
    expect(newState).toEqual(expected)
  })

  it('should clear app-detail item data when APP_DETAIL_CLEAR_DATA action is called', () => {
    const newState = appDetailReducer(undefined, { type: ActionTypes.APP_DETAIL_CLEAR_DATA as ActionType, data: null })
    const expected = {
      ...defaultState,
      appDetailData: null
    }
    expect(newState).toEqual(expected)
  })
})
