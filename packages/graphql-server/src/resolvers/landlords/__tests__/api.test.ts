import { mockContext } from '../../../__stubs__/context'
import {
  callGetLandlordsAPI,
  callCreateLandlordAPI,
  callUpdateLandlordAPI,
  callGetLandlordByIdAPI,
  callGetLandlordRelationshipsAPI,
  callCreateLandlordRelationshipAPI,
  callDeleteLandlordRelationshipAPI,
  callGetLandlordRelationshipByIdAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import {
  landlordsListMock,
  landlordMock,
  landlordRelationshipMock,
  landlordRelationshipsListMock,
} from '../__stubs__/landlord-query'
import {
  createLandlordArgsMock,
  updateLandlordArgsMock,
  createLandlordRelationshipArgsMock,
  deleteLandlordRelationshipArgsMock,
} from '../__stubs__/landlord-mutation'
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

describe('callGetLandlordsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: landlordsListMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetLandlordsAPI(args, mockContext)
    expect(result).toEqual(landlordsListMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetLandlordsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetLandlordByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: landlordMock })),
    })
    const args = { id: landlordMock.id }
    const result = await callGetLandlordByIdAPI(args, mockContext)
    expect(result).toEqual(landlordMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: landlordMock.id }
    const result = await callGetLandlordByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetLandlordRelationshipByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: landlordRelationshipMock })),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetLandlordRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual(landlordRelationshipMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: 'id', relationshipId: 'relationshipId' }
    const result = await callGetLandlordRelationshipByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetLandlordRelationshipsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: landlordRelationshipsListMock })),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetLandlordRelationshipsAPI(args, mockContext)
    expect(result).toEqual(landlordRelationshipsListMock)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1, id: 'id' }
    const result = await callGetLandlordRelationshipsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateLandlordAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: landlordMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(landlordMock.id)
    await callCreateLandlordAPI(createLandlordArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateLandlordAPI(createLandlordArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateLandlordRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callCreateLandlordRelationshipAPI(createLandlordRelationshipArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateLandlordRelationshipAPI(createLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateLandlordAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateLandlordAPI(updateLandlordArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateLandlordAPI(updateLandlordArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callDeleteLandlordRelationshipAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callDeleteLandlordRelationshipAPI(deleteLandlordRelationshipArgsMock, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      delete: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callDeleteLandlordRelationshipAPI(deleteLandlordRelationshipArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
