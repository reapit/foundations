import scopeListReducer, { defaultState, ScopeListState } from '../scope-list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { scopesListStub } from '@/sagas/__stubs__/scopes'

describe('app-list reducer', () => {
  it('should set loading when FETCH_SCOPE_LIST action is called', () => {
    const newState = scopeListReducer(undefined, {
      type: ActionTypes.FETCH_SCOPE_LIST as ActionType,
      data: null,
    })
    const expected: ScopeListState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })
  it('should set data when FETCH_SCOPE_LIST_SUCCESS action is called', () => {
    const newState = scopeListReducer(undefined, {
      type: ActionTypes.FETCH_SCOPE_LIST_SUCCESS as ActionType,
      data: scopesListStub,
    })
    const expected: ScopeListState = {
      ...defaultState,
      data: scopesListStub,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
  it('should set error message when FETCH_SCOPE_LIST_FAILED action is called', () => {
    const newState = scopeListReducer(undefined, {
      type: ActionTypes.FETCH_SCOPE_LIST_FAILED as ActionType,
      data: 'test',
    })
    const expected: ScopeListState = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })
})
