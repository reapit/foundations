import revisionDetailReducer, { defaultState } from '../revision-detail'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { revisionDetailDataStub } from '../../sagas/__stubs__/revision-detail'

describe('revision-detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = revisionDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when REVISION_DETAIL_LOADING action is called', () => {
    const newState = revisionDetailReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_LOADING as ActionType,
      data: true
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set error to false when REVISION_DETAIL_REQUEST_DATA__FAILURE action is called', () => {
    const newState = revisionDetailReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_REQUEST_DATA__FAILURE as ActionType,
      data: true
    })
    const expected = {
      ...defaultState,
      error: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set revision-detail item data when REVISION_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = revisionDetailReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_RECEIVE_DATA as ActionType,
      data: revisionDetailDataStub
    })
    const expected = {
      ...defaultState,
      revisionDetailData: revisionDetailDataStub
    }
    expect(newState).toEqual(expected)
  })

  it('should clear revision-detail item data when REVISION_DETAIL_CLEAR_DATA action is called', () => {
    const newState = revisionDetailReducer(undefined, {
      type: ActionTypes.REVISION_DETAIL_CLEAR_DATA as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      revisionDetailData: null
    }
    expect(newState).toEqual(expected)
  })
})
