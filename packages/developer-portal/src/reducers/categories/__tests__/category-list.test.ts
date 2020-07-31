import categoryListReducer, { defaultState, CategoryListState } from '../category-list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { categoriesStub } from '@/sagas/__stubs__/app-categories'

describe('category-list reducer', () => {
  it('should set loading when FETCH_CATEGORY_LIST action is called', () => {
    const newState = categoryListReducer(undefined, {
      type: ActionTypes.FETCH_CATEGORY_LIST as ActionType,
      data: null,
    })
    const expected: CategoryListState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })
  it('should set data when FETCH_CATEGORY_LIST_SUCCESS action is called', () => {
    const newState = categoryListReducer(undefined, {
      type: ActionTypes.FETCH_CATEGORY_LIST_SUCCESS as ActionType,
      data: categoriesStub,
    })
    const expected: CategoryListState = {
      ...defaultState,
      ...categoriesStub,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
  it('should set error message when FETCH_CATEGORY_LIST_FAILED action is called', () => {
    const newState = categoryListReducer(undefined, {
      type: ActionTypes.FETCH_CATEGORY_LIST_FAILED as ActionType,
      data: 'test',
    })
    const expected: CategoryListState = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'test',
    }
    expect(newState).toEqual(expected)
  })
})
