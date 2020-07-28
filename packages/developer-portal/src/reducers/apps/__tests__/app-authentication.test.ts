import appAuthenticationReducer, { defaultState, AppAuthenticationState } from '../app-authentication'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('app-authentication reducer', () => {
  it('should set loading when REQUEST_AUTHENTICATION_CODE action is called', () => {
    const newState = appAuthenticationReducer(undefined, {
      type: ActionTypes.REQUEST_AUTHENTICATION_CODE as ActionType,
      data: null,
    })
    const expected: AppAuthenticationState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set auth code when REQUEST_AUTHENTICATION_CODE_SUCCESS action is called', () => {
    const newState = appAuthenticationReducer(undefined, {
      type: ActionTypes.REQUEST_AUTHENTICATION_CODE_SUCCESS as ActionType,
      data: { clientSecret: 'clientSecret' },
    })
    const expected: AppAuthenticationState = {
      ...defaultState,
      isLoading: false,
      code: 'clientSecret',
    }
    expect(newState).toEqual(expected)
  })

  it('should remove auth code when REMOVE_AUTHENTICATION_CODE action is called', () => {
    const newState = appAuthenticationReducer(undefined, {
      type: ActionTypes.REMOVE_AUTHENTICATION_CODE as ActionType,
      data: null,
    })
    expect(newState).toEqual(defaultState)
  })
})
