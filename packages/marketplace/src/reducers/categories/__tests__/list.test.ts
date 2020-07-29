import { categoriesReducer, defaultCategoriesState } from '../list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { categoriesStub } from '@/sagas/__stubs__/categories'

describe('appCategories reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = categoriesReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultCategoriesState)
  })

  it('should set state to test when FETCH_CATEGORIES action is called with test', () => {
    const newState = categoriesReducer(undefined, {
      type: ActionTypes.FETCH_CATEGORIES as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultCategoriesState,
      isLoading: true,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_CATEGORIES_SUCCESS action is called with test', () => {
    const newState = categoriesReducer(undefined, {
      type: ActionTypes.FETCH_CATEGORIES_SUCCESS as ActionType,
      data: categoriesStub,
    })
    const expected = {
      ...defaultCategoriesState,
      ...categoriesStub,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when FETCH_CATEGORIES_FAILURE action is called with test', () => {
    const newState = categoriesReducer(undefined, {
      type: ActionTypes.FETCH_CATEGORIES_FAILURE as ActionType,
      data: 'mockError',
    })
    const expected = {
      ...defaultCategoriesState,
      isLoading: false,
      errorMessage: 'mockError',
    }
    expect(newState).toEqual(expected)
  })
})
