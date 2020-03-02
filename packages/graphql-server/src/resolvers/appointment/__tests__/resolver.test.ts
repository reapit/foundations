import { mutationCreateAppointment, queryAppointments, queryAppointment, mutationUpdateAppointment } from '../resolvers'
import { getAppointmentsArgs } from '../__mocks__/get-appointments-args'
import { createAppointmentArgs } from '../__mocks__/create-appointment-args'
import { updateAppointmentArgs } from '../__mocks__/update-appointment-args'
import { mockContext } from '../../../__mocks__/context'
import { appointments } from '../__mocks__/appointments'
import { appointment } from '../__mocks__/appointment'
import errors from '../../../errors'

jest.mock('../services', () => ({
  updateAppointmentById: jest.fn(() => appointment),
  getAppointments: jest.fn(() => appointments),
  getAppointmentById: jest.fn(() => appointment),
  createAppointmentAPI: jest.fn(() => true),
}))

describe('appointment resolvers', () => {
  describe('mutationUpdateAppointment', () => {
    it('should run correctly', () => {
      const output = appointment
      const result = mutationUpdateAppointment({}, updateAppointmentArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = mutationUpdateAppointment({}, updateAppointmentArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('mutationCreateAppointment', () => {
    it('should run correctly', () => {
      const output = true
      const result = mutationCreateAppointment({}, createAppointmentArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = mutationCreateAppointment({}, createAppointmentArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryAppointments', () => {
    it('should run correctly', () => {
      const output = appointments
      const result = queryAppointments({}, getAppointmentsArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryAppointments({}, getAppointmentsArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryAppointment', () => {
    it('should run correctly', () => {
      const output = appointment
      const result = queryAppointment({}, { id: '1' }, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryAppointment({}, { id: '1' }, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })
})
