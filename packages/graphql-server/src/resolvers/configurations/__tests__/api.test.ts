import { mockContext } from '../../../__stubs__/context'
import { callGetConfigurationsByTypeApi, callGetConfigurationsByTypeAndIdApi } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { appointmentTypeMock, appointmentTypesMock } from '../__stubs__/appointmentTypes'
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
      get: jest.fn(() => Promise.resolve({ data: appointmentTypeMock })),
    })
    const args = { id: 'id1', type: '​​appointmentTypes' as ConfigurationType }
    const result = await callGetConfigurationsByTypeAndIdApi(args, mockContext)
    expect(result).toEqual(appointmentTypeMock)
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
      get: jest.fn(() => Promise.resolve({ data: appointmentTypesMock })),
    })
    const args = { type: '​​appointmentTypes' as ConfigurationType }
    const result = await callGetConfigurationsByTypeApi(args, mockContext)
    expect(result).toEqual(appointmentTypesMock)
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
