import appDetailReducer, { defaultState } from '../app-detail'
import { ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('client app detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when CLIENT_FETCH_APP_DETAIL action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_APP_DETAIL as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isAppDetailLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set client item data when CLIENT_FETCH_APP_DETAIL_SUCCESS action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_APP_DETAIL_SUCCESS as ActionType,
      data: appDetailDataStub.data,
    })
    const expected = {
      ...defaultState,
      isAppDetailLoading: false,
      data: appDetailDataStub.data,
    }
    expect(newState).toEqual(expected)
  })

  it('should set error data when CLIENT_FETCH_APP_DETAIL_FAILED is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.CLIENT_FETCH_APP_DETAIL_FAILED as ActionType,
      data: 'error',
    })
    const expected = {
      ...defaultState,
      isAppDetailLoading: false,
      error: 'error',
    }
    expect(newState).toEqual(expected)
  })
})
