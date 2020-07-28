import appAuthenticationReducer, { defaultState, AppAuthenticationState } from '../app-authentication'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('app-authentication reducer', () => {
  it('should set loading when FETCH_APP_AUTHENTICATION action is called', () => {
    const newState = appAuthenticationReducer(undefined, {
      type: ActionTypes.FETCH_APP_AUTHENTICATION as ActionType,
      data: null,
    })
    const expected: AppAuthenticationState = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set auth code when FETCH_APP_AUTHENTICATION_SUCCESS action is called', () => {
    const newState = appAuthenticationReducer(undefined, {
      type: ActionTypes.FETCH_APP_AUTHENTICATION_SUCCESS as ActionType,
      data: { clientSecret: 'clientSecret' },
    })
    const expected: AppAuthenticationState = {
      ...defaultState,
      isLoading: false,
      code: 'clientSecret',
    }
    expect(newState).toEqual(expected)
  })

  it('should remove auth code when CLEAR_APP_AUTHENTICATION action is called', () => {
    const newState = appAuthenticationReducer(undefined, {
      type: ActionTypes.CLEAR_APP_AUTHENTICATION as ActionType,
      data: null,
    })
    expect(newState).toEqual(defaultState)
  })
})
