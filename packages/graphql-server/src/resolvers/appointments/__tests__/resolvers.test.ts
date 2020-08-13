import appointmentServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetAppointmentById,
  queryGetAppointments,
  mutationCreateAppointment,
  mutationUpdateAppointment,
  queryConfiguration,
  queryProperty,
  queryNegotiators,
  queryOffices,
} from '../resolvers'
import { createAppointmentArgsMock } from '../__stubs__/create-appointment'
import { updateAppointmentArgsMock } from '../__stubs__/update-appointment'
import { appointmentMock } from '../__stubs__/appointment'
import { appointmentsMock } from '../__stubs__/appointments'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getAppointmentById: jest.fn(() => appointmentMock),
  getAppointments: jest.fn(() => appointmentsMock),
  createAppointment: jest.fn(() => true),
  updateAppointment: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetAppointmentById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetAppointmentById(null, args, mockContext)
    expect(result).toEqual(appointmentServices.getAppointmentById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetAppointmentById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetAppointments', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetAppointments(null, args, mockContext)
    expect(result).toEqual(appointmentServices.getAppointments(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetAppointments(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateAppointment', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateAppointment(null, createAppointmentArgsMock, mockContext)
    expect(result).toEqual(appointmentServices.createAppointment(createAppointmentArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateAppointment(null, createAppointmentArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateAppointment', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateAppointment(null, updateAppointmentArgsMock, mockContext)
    expect(result).toEqual(appointmentServices.updateAppointment(updateAppointmentArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateAppointment(null, updateAppointmentArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryConfiguration', () => {
  it('should run correctly', () => {
    const result = queryConfiguration(appointmentMock, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})

describe('queryProperty', () => {
  it('should run correctly', () => {
    const result = queryProperty(appointmentMock, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})

describe('queryNegotiators', () => {
  it('should run correctly', () => {
    const result = queryNegotiators(appointmentMock, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})

describe('queryOffices', () => {
  it('should run correctly', () => {
    const result = queryOffices(appointmentMock, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})
