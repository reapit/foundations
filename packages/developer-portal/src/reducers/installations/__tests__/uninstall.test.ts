import { uninstallReducer, defaultState } from '../uninstall'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { categoriesStub } from '@/sagas/__stubs__/app-categories'

describe('uninstallApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = uninstallReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when UNINSTALL_APP action is called with test', () => {
    const newState = uninstallReducer(undefined, {
      type: ActionTypes.UNINSTALL_APP as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when UNINSTALL_APP_SUCCESS action is called with test', () => {
    const newState = uninstallReducer(undefined, {
      type: ActionTypes.UNINSTALL_APP_SUCCESS as ActionType,
      data: categoriesStub,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when UNINSTALL_APP_FAILED action is called with test', () => {
    const newState = uninstallReducer(undefined, {
      type: ActionTypes.UNINSTALL_APP_FAILED as ActionType,
      data: 'mockError',
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: 'mockError',
    }
    expect(newState).toEqual(expected)
  })
})
