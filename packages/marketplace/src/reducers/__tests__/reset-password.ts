import resetPasswordReducer, { defaultState } from '../reset-password'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('resetPassword reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = resetPasswordReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to test when DEVELOPER_SUBMIT_APP_SET_FORM_STATE action is called with test', () => {
    const newState = resetPasswordReducer(undefined, {
      type: ActionTypes.RESET_PASSWORD_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })
})
