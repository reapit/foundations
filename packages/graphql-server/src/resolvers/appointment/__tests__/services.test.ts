import { GetAppointmentByIdArgs } from '../appointments'
import { getAppointmentsArgs } from '../__mocks__/get-appointments-args'
import { mockContext } from '../../../__mocks__/context'
import { appointments } from '../__mocks__/appointments'
import { appointment } from '../__mocks__/appointment'
import { createAppointmentArgs } from '../__mocks__/create-appointment-args'
import { updateAppointmentArgs } from '../__mocks__/update-appointment-args'
import { updateAppointmentById, getAppointments, getAppointmentById, createAppointmentAPI } from '../services'

jest.mock('../api', () => ({
  callGetAppointmentsAPI: jest.fn(() => appointments),
  callGetAppointmentByIdAPI: jest.fn(() => appointment),
  callUpdateAppointmentByIdAPI: jest.fn(() => appointment),
  callCreateAppointmentByAPI: jest.fn(() => appointment),
}))

describe('appointments services', () => {
  describe('updateAppointmentByAPI', () => {
    it('should run correctly', () => {
      const output = appointment
      const result = updateAppointmentById(updateAppointmentArgs, mockContext)
      expect(result).toEqual(output)
    })
  })

  describe('getAppointments', () => {
    it('should run correctly', () => {
      const output = appointments
      const result = getAppointments(getAppointmentsArgs, mockContext)
      expect(result).toEqual(output)
    })
  })

  describe('getAppointmentById', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: 'test',
      } as GetAppointmentByIdArgs
      const output = appointment
      const result = getAppointmentById(mockArgs, mockContext)
      expect(result).toEqual(output)
    })
  }),
    describe('createAppointmentByIdAPI', () => {
      it('should run correctly', () => {
        const output = appointment
        const result = createAppointmentAPI(createAppointmentArgs, mockContext)
        expect(result).toEqual(output)
      })
    })
})
