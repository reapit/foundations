import revisionDetailReducer, { defaultState } from '../revision-detail'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('revision-detail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = revisionDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it(
    'should set declineFormState to SUBMITTING when DEVELOPER_SUBMIT_APP)' +
      'SET_FORM_STATE action is called with SUBMITTING',
    () => {
      const newState = revisionDetailReducer(undefined, {
        type: ActionTypes.REVISION_DECLINE_SET_FORM_STATE as ActionType,
        data: 'SUBMITTING',
      })
      const expected = {
        ...defaultState,
        declineFormState: 'SUBMITTING',
      }
      expect(newState).toEqual(expected)
    },
  )
})
