import { mockContext } from '../../../__stubs__/mock-context'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import {
  mockWorksOrderList,
  mockGetWorksOrderByIdArgs,
  mockWorksOrder,
  mockGetWorksOrderItemByIdArgs,
} from '../__stubs__/mock-works-orders-query'
import {
  callGetWorksOrderByIdAPI,
  callGetWorksOrdersAPI,
  callCreateWorksOrderdAPI,
  callUpdateWorksOrderAPI,
  callGetWorksOrderItemsAPI,
  callGetWorksOrderItemByIdAPI,
  callCreateWorksOrderItemAPI,
  callUpdateWorksOrderItemAPI,
  calldeleteWorksOrderItem,
} from '../api'
import {
  mockCreateWorksOrderArgs,
  mockUpdateWorkOrderArgs,
  mockCreateWorksOrderItemArgs,
  mockUpdateWorksOrderItemArgs,
  mockDeleteWorksOrderItemArgs,
} from '../__stubs__/mock-works-orders-mutation'
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

describe('calldeleteWorksOrderItem', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await calldeleteWorksOrderItem(mockDeleteWorksOrderItemArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await calldeleteWorksOrderItem(mockDeleteWorksOrderItemArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateWorksOrderItemAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await callUpdateWorksOrderItemAPI(mockUpdateWorksOrderItemArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await callUpdateWorksOrderItemAPI(mockUpdateWorksOrderItemArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateWorksOrderItemAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await callCreateWorksOrderItemAPI(mockCreateWorksOrderItemArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await callCreateWorksOrderItemAPI(mockCreateWorksOrderItemArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrderItemByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    await callGetWorksOrderItemByIdAPI(mockGetWorksOrderItemByIdArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const result = await callGetWorksOrderItemByIdAPI(mockGetWorksOrderItemByIdArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrderItemsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })

    const args = mockGetWorksOrderByIdArgs
    await callGetWorksOrderItemsAPI(args, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })

    const args = mockGetWorksOrderByIdArgs
    const result = await callGetWorksOrderItemsAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callUpdateWorksOrderAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
    })
    await callUpdateWorksOrderAPI(mockUpdateWorkOrderArgs, mockContext)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callUpdateWorksOrderAPI(mockUpdateWorkOrderArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateWorksOrderdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockWorksOrder })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockWorksOrder.id)
    await callCreateWorksOrderdAPI(mockCreateWorksOrderArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateWorksOrderdAPI(mockCreateWorksOrderArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrderByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockWorksOrderList })),
    })
    const args = mockGetWorksOrderByIdArgs
    const result = await callGetWorksOrderByIdAPI(args, mockContext)

    expect(result).toEqual(mockWorksOrderList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = mockGetWorksOrderByIdArgs
    const result = await callGetWorksOrderByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetWorksOrdersAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockWorksOrderList })),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrdersAPI(args, mockContext)
    expect(result).toEqual(mockWorksOrderList)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetWorksOrdersAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})
