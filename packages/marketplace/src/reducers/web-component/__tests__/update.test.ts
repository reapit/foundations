import { webComponentUpdateReducer, defaultState } from '../update'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { webComponentStub } from '@/sagas/__stubs__/web-component'

describe('updateWebComponentConfig reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = webComponentUpdateReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when UPDATE_WEB_COMPONENT_CONFIG action is called with test', () => {
    const newState = webComponentUpdateReducer(undefined, {
      type: ActionTypes.UPDATE_WEB_COMPONENT_CONFIG as ActionType,
      data: undefined,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when UPDATE_WEB_COMPONENT_CONFIG_SUCCESS action is called with test', () => {
    const newState = webComponentUpdateReducer(undefined, {
      type: ActionTypes.UPDATE_WEB_COMPONENT_CONFIG_SUCCESS as ActionType,
      data: webComponentStub,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      errorMessage: '',
    }
    expect(newState).toEqual(expected)
  })

  it('should set state to test when UPDATE_WEB_COMPONENT_CONFIG_FAILED action is called with test', () => {
    const newState = webComponentUpdateReducer(undefined, {
      type: ActionTypes.UPDATE_WEB_COMPONENT_CONFIG_FAILED as ActionType,
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
