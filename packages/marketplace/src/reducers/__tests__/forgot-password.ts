import forgotPasswordReducer, { defaultState } from '../forgot-password'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('forgot-password reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = forgotPasswordReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when FORGOT_PASSWORD_LOADING action is called', () => {
    const newState = forgotPasswordReducer(undefined, {
      type: ActionTypes.FORGOT_PASSWORD_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })
})
