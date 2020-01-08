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

  it('should set error to false when APP_DETAIL_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE as ActionType,
      data: true
    })
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
      isStale: false,
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

  it('should set loading when APP_DETAIL_REQUEST_AUTHENTICATION_CODE action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.REQUEST_AUTHENTICATION_CODE as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      authentication: {
        loading: true,
        code: ''
      }
    }
    expect(newState).toEqual(expected)
  })

  it('should set auth code when REQUEST_AUTHENTICATION_CODE_SUCCESS action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.REQUEST_AUTHENTICATION_CODE_SUCCESS as ActionType,
      data: { clientSecret: 'clientSecret' }
    })
    const expected = {
      ...defaultState,
      authentication: {
        code: 'clientSecret',
        loading: false
      }
    }
    expect(newState).toEqual(expected)
  })

  it('should remove auth code when REMOVE_AUTHENTICATION_CODE action is called', () => {
    const newState = appDetailReducer(undefined, {
      type: ActionTypes.REMOVE_AUTHENTICATION_CODE as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      authentication: {
        code: '',
        loading: false
      }
    }
    expect(newState).toEqual(expected)
  })
})
