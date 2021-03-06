import { mockContext } from '../../../__stubs__/mock-context'
import { callGetConfigurationsByTypeApi, callGetConfigurationsByTypeAndIdApi } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockAppointmentType, mockAppointmentTypes } from '../__stubs__/mock-appointment-types'
import { ConfigurationType } from '../configurations'

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

describe('callGetConfigurationsByTypeAndIdApi', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockAppointmentType })),
    })
    const args = { id: 'id1', type: '​​appointmentTypes' as ConfigurationType }
    const result = await callGetConfigurationsByTypeAndIdApi(args, mockContext)
    expect(result).toEqual(mockAppointmentType)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: 'id1', type: '​​appointmentTypes' as ConfigurationType }
    const result = await callGetConfigurationsByTypeAndIdApi(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetConfigurationsByTypeApi', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockAppointmentTypes })),
    })
    const args = { type: '​​appointmentTypes' as ConfigurationType }
    const result = await callGetConfigurationsByTypeApi(args, mockContext)
    expect(result).toEqual(mockAppointmentTypes)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { type: '​​appointmentTypes' as ConfigurationType }
    const result = await callGetConfigurationsByTypeApi(args, mockContext)
    expect(result).toEqual('caught error')
  })
})
