import createAppRevisionReducer, { defaultState } from '../create-app-revision'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('createAppRevision reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = createAppRevisionReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set isLoading to true when CREATE_APP_REVISION', () => {
    const newState = createAppRevisionReducer(undefined, {
      type: ActionTypes.CREATE_APP_REVISION as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when CREATE_APP_REVISION_SUCCESS', () => {
    const newState = createAppRevisionReducer(undefined, {
      type: ActionTypes.CREATE_APP_REVISION_SUCCESS as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set isLoading to false when CREATE_APP_REVISION_FAILED', () => {
    const newState = createAppRevisionReducer(undefined, {
      type: ActionTypes.CREATE_APP_REVISION_FAILED as ActionType,
      data: {},
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })
})
