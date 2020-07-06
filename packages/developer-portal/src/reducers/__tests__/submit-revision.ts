import submitRevisionReducer, { defaultState } from '../submit-revision'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('submitRevision reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = submitRevisionReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it(
    'should set formState to SUBMITTING when DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE' +
      'action is called with SUBMITTING',
    () => {
      const newState = submitRevisionReducer(undefined, {
        type: ActionTypes.DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE as ActionType,
        data: 'SUBMITTING',
      })
      const expected = {
        ...defaultState,
        formState: 'SUBMITTING',
      }
      expect(newState).toEqual(expected)
    },
  )
})
