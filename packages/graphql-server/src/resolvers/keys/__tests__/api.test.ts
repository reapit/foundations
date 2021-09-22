import { mockContext } from '../../../__stubs__/mock-context'
import {
  callGetKeyAPI,
  callGetPropertyKeysAPI,
  callCreateKeyAPI,
  callGetKeyMovementsAPI,
  callGetKeyMovementAPI,
  callCreateKeyMovementAPI,
  callUpdateKeyMovementAPI,
} from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockKey } from '../__stubs__/mock-key'
import { mockKeys } from '../__stubs__/mock-keys'
import { mockKeyMovement, mockKeyMovements, mockKeyMovementUpdate } from '../__stubs__/mock-key-movement'
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

describe('callGetKeyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockKey })),
    })
    const args = { propertyId: 'a', keyId: 'b' }
    const result = await callGetKeyAPI(args, mockContext)
    expect(result).toEqual(mockKey)
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    const args = { propertyId: 'a', keyId: 'b' }
    let err
    try {
      await callGetKeyAPI(args, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})

describe('callGetPropertyKeysAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockKeys })),
    })
    const args = { propertyId: 'a' } as any
    const result = await callGetPropertyKeysAPI(args, mockContext)
    expect(result).toEqual(mockKeys)
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    const args = { propertyId: 'a' } as any
    let err
    try {
      await callGetPropertyKeysAPI(args, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})

describe('callCreateKeyAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockKey })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce('a')
    await callCreateKeyAPI(mockKey, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    let err
    try {
      await callCreateKeyAPI(mockKey, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})

describe('callGetKeyMovementsAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockKeyMovements })),
    })
    await callGetKeyMovementsAPI({ propertyId: 'a', keyId: 'b' }, mockContext)
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    let err
    try {
      await callGetKeyMovementsAPI({ propertyId: 'a', keyId: 'b' }, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})

describe('callGetKeyMovementAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockKeyMovement })),
    })
    await callGetKeyMovementAPI({ propertyId: 'a', keyId: 'b', movementId: 'c' }, mockContext)
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    let err
    try {
      await callGetKeyMovementAPI({ propertyId: 'a', keyId: 'b', movementId: 'c' }, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})

describe('callCreateKeyMovementAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockKeyMovement })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce('a')
    await callCreateKeyMovementAPI(mockKeyMovement, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    let err
    try {
      await callCreateKeyMovementAPI(mockKeyMovement, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})

describe('callUpdateKeyMovementAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      patch: jest.fn(() => Promise.resolve({ headers: 'header', status: 201 })),
      get: jest.fn(() => Promise.resolve({ data: mockKeyMovement })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce('a')
    await callUpdateKeyMovementAPI(mockKeyMovementUpdate, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should throw correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(async () => {
        throw new Error('thrown')
      }),
    })
    let err
    try {
      await callUpdateKeyMovementAPI(mockKeyMovementUpdate, mockContext)
    } catch (e) {
      err = e
    }
    expect(err).toEqual('caught error')
  })
})
