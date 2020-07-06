import appCaregoriesReducer, { defaultState } from '../app-categories'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appCategorieStub } from '../../sagas/__stubs__/app-categories'

describe('appCategories reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appCaregoriesReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when CATEGORIES_RECEIVE_DATA action is called with test', () => {
    const newState = appCaregoriesReducer(undefined, {
      type: ActionTypes.CATEGORIES_RECEIVE_DATA as ActionType,
      data: appCategorieStub,
    })
    const expected = {
      ...defaultState,
      ...appCategorieStub,
    }
    expect(newState).toEqual(expected)
  })
})
