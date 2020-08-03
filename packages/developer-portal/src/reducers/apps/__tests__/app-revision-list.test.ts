import appRevisionListReducer, { defaultState, AppRevisionListState } from '../app-revision-list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'

describe('app revision list reducer', () => {
  it('should set loading when FETCH_APP_REVISION_LIST action is called', () => {
    const newState = appRevisionListReducer(undefined, {
      type: ActionTypes.FETCH_APP_REVISION_LIST as ActionType,
      data: null,
    })
    const expected: AppRevisionListState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })
  it('should set data when FETCH_APP_REVISION_LIST_SUCCESS action is called', () => {
    const newState = appRevisionListReducer(undefined, {
      type: ActionTypes.FETCH_APP_REVISION_LIST_SUCCESS as ActionType,
      data: revisionsDataStub,
    })
    const expected: AppRevisionListState = {
      ...defaultState,
      ...revisionsDataStub,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
  it('should set error message when FETCH_APP_REVISION_LIST_FAILED action is called', () => {
    const newState = appRevisionListReducer(undefined, {
      type: ActionTypes.FETCH_APP_REVISION_LIST_FAILED as ActionType,
      data: 'test',
    })
    const expected: AppRevisionListState = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })
  it('should remove auth code when CLEAR_APP_REVISION_LIST action is called', () => {
    const newState = appRevisionListReducer(undefined, {
      type: ActionTypes.CLEAR_APP_REVISION_LIST as ActionType,
      data: null,
    })
    expect(newState).toEqual(defaultState)
  })
})
