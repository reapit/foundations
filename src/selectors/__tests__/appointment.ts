import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import {
  selectAppointments,
  selectAppointmentTypes,
  selectTodayAppointments,
  selectTomorrowAppointments,
  selectWeekAppointments
} from '../appointments'
import { ReduxState } from '@/types/core'

describe('appointments selector', () => {
  describe('selectAppointments', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick property need for test
      const input = {
        appointments: appointmentsDataStub
      } as ReduxState
      const output = appointmentsDataStub && appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
      const result = selectAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return []', () => {
      // @ts-ignore: only pick property need for test
      const input = {} as ReduxState
      const output = []
      const result = selectAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectAppointmentTypes', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick property need for test
      const input = {
        appointments: appointmentsDataStub
      } as ReduxState
      const output = appointmentsDataStub && appointmentsDataStub.appointments && appointmentsDataStub.appointmentTypes
      const result = selectAppointmentTypes(input)
      expect(result).toEqual(output)
    })

    it('should return []', () => {
      // @ts-ignore: only pick property need for test
      const input = {} as ReduxState
      const output = []
      const result = selectAppointmentTypes(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectTodayAppointments', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick property need for test
      const input = {
        appointments: {
          today: appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
        }
      } as ReduxState
      const output = appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
      const result = selectTodayAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      // @ts-ignore: only pick property need for test
      const input = {} as ReduxState
      const output = null
      const result = selectTodayAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectTomorrowAppointments', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick property need for test
      const input = {
        appointments: {
          tomorrow: appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
        }
      } as ReduxState
      const output = appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
      const result = selectTomorrowAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      // @ts-ignore: only pick property need for test
      const input = {} as ReduxState
      const output = null
      const result = selectTomorrowAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectWeekAppointments', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick property need for test
      const input = {
        appointments: {
          weekView: appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
        }
      } as ReduxState
      const output = appointmentsDataStub.appointments && appointmentsDataStub.appointments.data
      const result = selectWeekAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      // @ts-ignore: only pick property need for test
      const input = {} as ReduxState
      const output = null
      const result = selectWeekAppointments(input)
      expect(result).toEqual(output)
    })
  })
})
