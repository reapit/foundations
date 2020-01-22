import submitReducer, { defaultState } from '../success'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('success reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = submitReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to submitting when SUBMIT_COMPLETE_SET_FORM_STATE action is called with submitting', () => {
    const newState = submitReducer(undefined, {
      type: ActionTypes.SUBMIT_COMPLETE_SET_FORM_STATE as ActionType,
      data: 'submitting',
    })
    const expected = {
      ...defaultState,
      submitCompleteFormState: 'submitting',
    }
    expect(newState).toEqual(expected)
  })
})
