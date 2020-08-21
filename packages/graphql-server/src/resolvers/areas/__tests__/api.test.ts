import { mockContext } from '../../../__stubs__/context'
import { callGetAreasAPI, callCreateAreaAPI, callUpdateAreaAPI, callGetAreaByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { areaMock } from '../__stubs__/area'
import { areasMock } from '../__stubs__/areas'
import { createAreaArgsMock } from '../__stubs__/create-area'
import { updateAreaArgsMock } from '../__stubs__/update-area'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'

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

describe('callGetAreasAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: areasMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetAreasAPI(args, mockContext)
    expect(result).toEqual(areasMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetAreasAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetAreaByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: areaMock })),
    })
    const args = { id: areaMock.id }
    const result = await callGetAreaByIdAPI(args, mockContext)
    expect(result).toEqual(areaMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: areaMock.id }
    const result = await callGetAreaByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateAreaAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: areaMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(areaMock.id)
    await callCreateAreaAPI(createAreaArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateAreaAPI(createAreaArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateAreaAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateAreaAPI(updateAreaArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateAreaAPI(updateAreaArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
