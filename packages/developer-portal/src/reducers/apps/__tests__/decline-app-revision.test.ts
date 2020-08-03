import declineAppRevisionReducer, { defaultState } from '../decline-app-revision'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('declineAppRevision reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = declineAppRevisionReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isLoading to true when DECLINE_APP_REVISION', () => {
    const newState = declineAppRevisionReducer(undefined, {
      type: ActionTypes.DECLINE_APP_REVISION as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when DECLINE_APP_REVISION_SUCCESS', () => {
    const newState = declineAppRevisionReducer(undefined, {
      type: ActionTypes.DECLINE_APP_REVISION_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when DECLINE_APP_REVISION_FAILED', () => {
    const newState = declineAppRevisionReducer(undefined, {
      type: ActionTypes.DECLINE_APP_REVISION_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
