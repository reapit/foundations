import reducer, { defaultState as getDefaultState, AuthState } from '../auth'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

const defaultState = getDefaultState()

describe('auth reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = reducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('authLogin', () => {
    const newState = reducer(undefined, {
      type: ActionTypes.AUTH_LOGIN as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      error: false,
    }
    expect(newState).toEqual(expected)
  })

  it('authLoginSuccess', () => {
    const data = { userName: '' }
    const newState = reducer(undefined, {
      type: ActionTypes.AUTH_LOGIN_SUCCESS as ActionType,
      data,
    })
    const expected = {
      ...defaultState,
      error: false,
      loginSession: data,
    }
    expect(newState).toEqual(expected)
  })

  it('authLoginFailure', () => {
    const newState = reducer(undefined, {
      type: ActionTypes.AUTH_LOGIN_FAILURE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      error: true,
    }
    expect(newState).toEqual(expected)
  })

  it('authLogoutSuccess', () => {
    const newState = reducer(undefined, {
      type: ActionTypes.AUTH_LOGOUT_SUCCESS as ActionType,
      data: null,
    })
    const expected = defaultState
    expect(newState).toEqual(expected)
  })

  it('authSetRefreshSession', () => {
    const data = { refreshToken: '', userName: '', loginType: 'CLIENT', mode: 'WEB' }
    const newState = reducer(undefined, {
      type: ActionTypes.AUTH_SET_REFRESH_SESSION as ActionType,
      data,
    })
    const expected = {
      ...defaultState,
      refreshSession: data,
    }
    expect(newState).toEqual(expected)
  })
})
