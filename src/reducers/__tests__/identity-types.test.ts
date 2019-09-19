import identityTypesReducer, { defaultState } from '../identity-types'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { identityTypes } from '@/sagas/__stubs__/identity-types'

describe('Identyti types reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = identityTypesReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when IDENTITY_TYPES_REQUEST_DATA action is called', () => {
    const newState = identityTypesReducer(undefined, {
      type: ActionTypes.IDENTITY_TYPES_REQUEST_DATA as ActionType,
      data: {}
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when IDENTITY_TYPES_RECEIVE_DATA action is called', () => {
    const newState = identityTypesReducer(undefined, {
      type: ActionTypes.IDENTITY_TYPES_RECEIVE_DATA as ActionType,
      data: identityTypes
    })
    const expected = {
      ...defaultState,
      loading: false,
      identityTypes: identityTypes
    }
    expect(newState).toEqual(expected)
  })
})
