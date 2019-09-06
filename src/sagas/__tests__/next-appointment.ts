import nextAppointmentSagas, { nextAppointmentDataListen, validateNextAppointment } from '@/sagas/next-appointment'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  nextAppointmentClear,
  nextAppointmentValidate,
  nextAppointmentValidateSuccess
} from '@/actions/next-appointment'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'

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
