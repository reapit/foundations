import { appDetailReducer, defaultAppDetailState } from '../detail'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appsDataStub } from '@/sagas/__stubs__/apps'

describe('appDetailReducer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultAppDetailState)
  })

  it('should set state to test when FETCH_APP_DETAIL action is called with test', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultAppDetailState,
      isLoading: true,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_APP_DETAIL_SUCCESS action is called with test', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL_SUCCESS as ActionType,
      data: appsDataStub.data?.[0],
    })
    const expected = {
      data: appsDataStub.data?.[0],
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_APP_DETAIL_FAILED action is called with test', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_DETAIL_FAILED as ActionType,
      data: 'mockError',
    })
    const expected = {
      ...defaultAppDetailState,
      isLoading: false,
      errorMessage: 'mockError',
    }
    expect(newState).toEqual(expected)
  })
})
