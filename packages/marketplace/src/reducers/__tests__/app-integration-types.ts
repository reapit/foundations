import integrationTypesReducer, { defaultState } from '../app-integration-types'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

describe('integrationTypes reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = integrationTypesReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set state to test when INTEGRATION_TYPES_RECEIVE_DATA action is called with test', () => {
    const newState = integrationTypesReducer(undefined, {
      type: ActionTypes.INTEGRATION_TYPES_RECEIVE_DATA as ActionType,
      data: integrationTypesStub,
    })
    const expected = {
      ...defaultState,
      ...integrationTypesStub,
    }
    expect(newState).toEqual(expected)
  })
})
