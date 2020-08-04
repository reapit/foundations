import appRevisionDetailReducer, { defaultState } from '../app-revision-detail'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { revisionDetailDataStub } from '@/sagas/__stubs__/revision-detail'

describe('app-revision-detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appRevisionDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APP_REVISION_DETAIL_LOADING action is called', () => {
    const newState = appRevisionDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_REVISION_DETAIL as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when APP_REVISION_DETAIL_REQUEST_DATA_FAILURE action is called', () => {
    const newState = appRevisionDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_REVISION_DETAIL_FAILED as ActionType,
      data: 'test',
    })
    const expected = {
      ...defaultState,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })

  it('should set app-detail item data when APP_REVISION_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = appRevisionDetailReducer(undefined, {
      type: ActionTypes.FETCH_APP_REVISION_DETAIL_SUCCESS as ActionType,
      data: revisionDetailDataStub,
    })
    const expected = {
      ...defaultState,
      data: revisionDetailDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear app-detail item data when APP_REVISION_DETAIL_CLEAR_DATA action is called', () => {
    const newState = appRevisionDetailReducer(undefined, {
      type: ActionTypes.CLEAR_APP_REVISION_DETAIL as ActionType,
      data: null,
    })
    expect(newState).toEqual(defaultState)
  })
})
