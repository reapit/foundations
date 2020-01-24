import { directionReducer, defaultState } from '../direction'
import { ActionType } from '@/types/core'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import ActionTypes from '@/constants/action-types'

describe('current loc reducer test', () => {
  it('should return default state if action not matched', () => {
    const newState = directionReducer(undefined, { type: 'UNKNOWN' as ActionType, data: null })
    expect(newState).toEqual(defaultState)
  })

  it('it should change change destination', () => {
    const newState = directionReducer(defaultState, {
      type: ActionTypes.SET_DESTINATION as ActionType,
      data: appointmentDataStub,
    })
    const output = {
      destination: appointmentDataStub,
    }
    expect(newState).toEqual(output)
  })
})
