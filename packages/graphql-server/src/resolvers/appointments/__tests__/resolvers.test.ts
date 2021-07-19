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
import { mockCreateAppointmentArgs } from '../__stubs__/mock-create-appointment'
import { mockUpdateAppointmentArgs } from '../__stubs__/mock-update-appointment'
import { mockAppointment } from '../__stubs__/mock-appointment'
import { mockAppointments } from '../__stubs__/mock-appointments'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getAppointmentById: jest.fn(() => mockAppointment),
  getAppointments: jest.fn(() => mockAppointments),
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
    const result = mutationCreateAppointment(null, mockCreateAppointmentArgs, mockContext)
    expect(result).toEqual(appointmentServices.createAppointment(mockCreateAppointmentArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateAppointment(null, mockCreateAppointmentArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateAppointment', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateAppointment(null, mockUpdateAppointmentArgs, mockContext)
    expect(result).toEqual(appointmentServices.updateAppointment(mockUpdateAppointmentArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateAppointment(null, mockUpdateAppointmentArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryConfiguration', () => {
  it('should run correctly', () => {
    const result = queryConfiguration(mockAppointment, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})

describe('queryProperty', () => {
  it('should run correctly', () => {
    const result = queryProperty(mockAppointment, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})

describe('queryNegotiators', () => {
  it('should run correctly', () => {
    const result = queryNegotiators(mockAppointment, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})

describe('queryOffices', () => {
  it('should run correctly', () => {
    const result = queryOffices(mockAppointment, undefined, mockContext)
    expect(result).toEqual(expect.any(Object))
  })
})
