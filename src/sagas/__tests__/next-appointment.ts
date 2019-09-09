import nextAppointmentSagas, { nextAppointmentDataListen, validateNextAppointment } from '@/sagas/next-appointment'
import ActionTypes from '@/constants/action-types'
import { takeLatest, all, fork } from '@redux-saga/core/effects'

jest.mock('../../core/store')
jest.mock('@reapit/elements')

describe('next appointment validate', () => {
  // TODO: too complicated to write a proper test atm, will come back later
})

describe('next appointment thunks', () => {
  describe('nextAppointmentDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = nextAppointmentDataListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.NEXT_APPOINTMENT_VALIDATE, validateNextAppointment))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appointmentsSagas', () => {
    it('should listen data request', () => {
      const gen = nextAppointmentSagas()

      expect(gen.next().value).toEqual(all([fork(nextAppointmentDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
