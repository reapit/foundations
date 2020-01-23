import nextAppointmentReducer, { defaultState } from '../next-appointment'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { nextAppointmentDataStub } from '@/sagas/__stubs__/next-appointment'

describe('appointments reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = nextAppointmentReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set new state when NEXT_APPOINTMENT_VALIDATE_SUCCESS action is called', () => {
    const nextAppointmentPayload = nextAppointmentDataStub.data
    const newState = nextAppointmentReducer(undefined, {
      type: ActionTypes.NEXT_APPOINTMENT_VALIDATE_SUCCESS as ActionType,
      data: nextAppointmentPayload
    })
    const expected = {
      ...defaultState,
      data: nextAppointmentPayload
    }
    expect(newState).toEqual(expected)
  })

  it('should set reset the state when NEXT_APPOINTMENT_CLEAR action is called', () => {
    const newState = nextAppointmentReducer(undefined, {
      type: ActionTypes.NEXT_APPOINTMENT_CLEAR as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      data: null
    }
    expect(newState).toEqual(expected)
  })
})
