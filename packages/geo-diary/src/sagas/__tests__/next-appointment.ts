import nextAppointmentSagas, {
  nextAppointmentDataListen,
  validateNextAppointment,
  getCurrentPosition,
} from '@/sagas/next-appointment'
import ActionTypes from '@/constants/action-types'
import { takeLatest, all, fork, select, call, put } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { selectAppointments } from '@/selectors/appointments'
import { appointmentsDataStub } from '../__stubs__/appointments'
import { nextAppointmentClear } from '@/actions/next-appointment'

jest.mock('../../core/store')
jest.mock('@reapit/elements')

describe('getCurrentPosition', () => {
  it('should return correctly', done => {
    getCurrentPosition().then(result => {
      expect(result).toEqual({
        coords: {
          accuracy: 16850,
          altitudeAccuracy: null,
          attitude: null,
          heading: null,
          latitude: 1.352083,
          longitude: 105.819836,
          speed: null,
        },
        timestamp: 1584618637173,
      })
      done()
    })
  })
})

describe('next appointment validate', () => {
  describe('validateNextAppointment', () => {
    it('should call api success', () => {
      const gen = cloneableGenerator(validateNextAppointment as any)('DRIVING')
      expect(gen.next().value).toEqual(select(selectAppointments))
      expect(gen.next(appointmentsDataStub.appointments?._embedded).value).toEqual(call(getCurrentPosition))
      expect(gen.next().value).toEqual(put(nextAppointmentClear()))
      expect(gen.next().done).toEqual(true)
    })
  })
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
