import appointmentsReducer, { defaultState } from '../appointments'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appointmentsDataStub } from '../../sagas/__stubs__/appointments'
import { oc } from 'ts-optchain'

describe('appointments reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appointmentsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when APPOINTMENTS_REQUEST_DATA action is called', () => {
    const newState = appointmentsReducer(undefined, {
      type: ActionTypes.APPOINTMENTS_REQUEST_DATA as ActionType,
      data: { time: 'Today' }
    })
    const expected = {
      ...defaultState,
      time: 'Today'
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to true when APPOINTMENTS_LOADING action is called', () => {
    const newState = appointmentsReducer(undefined, {
      type: ActionTypes.APPOINTMENTS_LOADING as ActionType,
      data: true
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set appointments item data when APPOINTMENTS_RECEIVE_DATA action is called', () => {
    const newState = appointmentsReducer(undefined, {
      type: ActionTypes.APPOINTMENTS_RECEIVE_DATA as ActionType,
      data: appointmentsDataStub
    })
    const expected = {
      ...defaultState,
      appointments: appointmentsDataStub.appointments,
      appointmentTypes: appointmentsDataStub.appointmentTypes
    }
    expect(newState).toEqual(expected)
  })

  it('should clear appointments item data when APPOINTMENTS_CLEAR_DATA action is called', () => {
    const newState = appointmentsReducer(undefined, {
      type: ActionTypes.APPOINTMENTS_CLEAR_DATA as ActionType,
      data: null
    })
    const expected = {
      ...defaultState,
      appointments: null
    }
    expect(newState).toEqual(expected)
  })

  it('should set selectedAppointment item data when SET_SELECTED_APPOINTMENT action is called', () => {
    const newState = appointmentsReducer(undefined, {
      type: ActionTypes.SET_SELECTED_APPOINTMENT as ActionType,
      data: oc(appointmentsDataStub).appointments.data[0]()
    })
    const expected = {
      ...defaultState,
      selectedAppointment: oc(appointmentsDataStub).appointments.data[0]()
    }
    expect(newState).toEqual(expected)
  })
})
