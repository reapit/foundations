import submitReducer, { defaultState } from '../submit-app'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('submitApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = submitReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to test when DEVELOPER_SUBMIT_APP)SET_FORM_STATE action is called with test', () => {
    const newState = submitReducer(undefined, {
      type: ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE as ActionType,
      data: 'test'
    })
    const expected = {
      ...defaultState,
      formState: 'test'
    }
    expect(newState).toEqual(expected)
  })
})
