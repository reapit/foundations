import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetAppointmentsAPI,
  callCreateAppointmentAPI,
  callUpdateAppointmentAPI,
  callGetAppointmentByIdAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockAppointment } from '../__stubs__/mock-appointment'
import { mockAppointments } from '../__stubs__/mock-appointments'
import { mockCreateAppointmentArgs } from '../__stubs__/mock-create-appointment'
import { mockUpdateAppointmentArgs } from '../__stubs__/mock-update-appointment'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

jest.mock('apollo-server-lambda', () => {
  return {
    AuthenticationError: jest.fn(),
    ValidationError: jest.fn(),
    ForbiddenError: jest.fn(),
    ApolloError: jest.fn(),
    UserInputError: jest.fn(),
  }
})

jest.mock('../../../utils/get-id-from-create-headers', () => ({
  getIdFromCreateHeaders: jest.fn(),
}))

jest.mock('../../../utils/handle-error', () => ({
  handleError: jest.fn(() => Promise.resolve('caught error')),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}))

describe('callGetAppointmentsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockAppointments })),
    })
    const args = { pageSize: 1 }
    const result = await callGetAppointmentsAPI(args, mockContext)
    expect(result).toEqual(mockAppointments)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetAppointmentsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetAppointmentByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockAppointment })),
    })
    const args = { id: mockAppointment.id }
    const result = await callGetAppointmentByIdAPI(args, mockContext)
    expect(result).toEqual(mockAppointment)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockAppointment.id }
    const result = await callGetAppointmentByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateAppointmentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockAppointment })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockAppointment.id)
    await callCreateAppointmentAPI(mockCreateAppointmentArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateAppointmentAPI(mockCreateAppointmentArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateAppointmentAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateAppointmentAPI(mockUpdateAppointmentArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValue({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateAppointmentAPI(mockUpdateAppointmentArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
