import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import {
  selectAppointments,
  selectAppointmentTypes,
  selectTodayAppointments,
  selectTomorrowAppointments,
  selectWeekAppointments,
  selectAppointmentsFilterTime
} from '../appointments'
import { ReduxState } from '@/types/core'

describe('appointments selector', () => {
  describe('selectAppointments', () => {
    it('should run correctly', () => {
      const input = {
        appointments: appointmentsDataStub
      } as ReduxState
      const output =
        appointmentsDataStub && appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
      const result = selectAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return []', () => {
      const input = {} as ReduxState
      const output = []
      const result = selectAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectAppointmentTypes', () => {
    it('should run correctly', () => {
      const input = {
        appointments: appointmentsDataStub
      } as ReduxState
      const output = appointmentsDataStub && appointmentsDataStub.appointments && appointmentsDataStub.appointmentTypes
      const result = selectAppointmentTypes(input)
      expect(result).toEqual(output)
    })

    it('should return []', () => {
      const input = {} as ReduxState
      const output = []
      const result = selectAppointmentTypes(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectTodayAppointments', () => {
    it('should run correctly', () => {
      const input = {
        appointments: {
          today: appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
        }
      } as ReduxState
      const output = appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
      const result = selectTodayAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      const input = {} as ReduxState
      const output = null
      const result = selectTodayAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectTomorrowAppointments', () => {
    it('should run correctly', () => {
      const input = {
        appointments: {
          tomorrow: appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
        }
      } as ReduxState
      const output = appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
      const result = selectTomorrowAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      const input = {} as ReduxState
      const output = null
      const result = selectTomorrowAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectWeekAppointments', () => {
    it('should run correctly', () => {
      const input = {
        appointments: {
          weekView: appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
        }
      } as ReduxState
      const output = appointmentsDataStub.appointments && appointmentsDataStub.appointments._embedded
      const result = selectWeekAppointments(input)
      expect(result).toEqual(output)
    })

    it('should return null', () => {
      const input = {} as ReduxState
      const output = null
      const result = selectWeekAppointments(input)
      expect(result).toEqual(output)
    })
  })

  describe('selectAppointmentsFilterTime', () => {
    it('should run correctly', () => {
      const input = {
        appointments: {
          time: 'Today'
        }
      } as ReduxState
      const output = 'Today'
      const result = selectAppointmentsFilterTime(input)
      expect(result).toEqual(output)
    })

    it('should return default value', () => {
      const input = {} as ReduxState
      const output = 'Today'
      const result = selectAppointmentsFilterTime(input)
      expect(result).toEqual(output)
    })
  })
})
