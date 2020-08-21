import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import formStateReducer, { defaultState } from '../form-state'

describe('formStateReducer', () => {
  it('should return default state if action not matched', () => {
    const newState = formStateReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })
  it('should set state to test when FETCH_MEMBER_DETAILS action is called with test', () => {
    const newState = formStateReducer(undefined, {
      type: ActionTypes.SET_INSTALLATIONS_FORM_STATE as ActionType,
      data: 'DONE',
    })
    const expected = {
      ...defaultState,
      state: 'DONE',
    }
    expect(newState).toEqual(expected)
  })
})
