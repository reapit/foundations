import keyServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetKey,
  queryGetPropertyKeys,
  mutationCreateKey,
  mutationCreateKeyMovement,
  mutationUpdateKeyMovement,
} from '../resolvers'
import { mockKey } from '../__stubs__/mock-key'
import { mockKeys } from '../__stubs__/mock-keys'
import { mockKeyMovement, mockKeyMovementUpdate } from '../__stubs__/mock-key-movement'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getKeysByPropertyId: jest.fn(() => mockKeys),
  getKeyById: jest.fn(() => mockKey),
  createKey: jest.fn(() => mockKey),
  createKeyMovement: jest.fn(() => mockKeyMovement),
  updateKeyMovement: jest.fn(() => mockKeyMovement),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetKey', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { propertyId: 'a', keyId: 'b' }
    const result = queryGetKey(null, args, mockContext)
    expect(result).toEqual(keyServices.getKeyById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { propertyId: 'a', keyId: 'b' }
    const result = queryGetKey(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetPropertyKeys', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { propertyId: 'a' }
    const result = queryGetPropertyKeys(null, args, mockContext)
    expect(result).toEqual(keyServices.getKeysByPropertyId(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { propertyId: 'a' }
    const result = queryGetPropertyKeys(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateKey', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateKey(null, mockKey, mockContext)
    expect(result).toEqual(keyServices.createKey(mockKey, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateKey(null, mockKey, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateKeyMovement', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateKeyMovement(null, mockKeyMovement, mockContext)
    expect(result).toEqual(keyServices.createKeyMovement(mockKeyMovement, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateKeyMovement(null, mockKeyMovement, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateKeyMovement', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateKeyMovement(null, mockKeyMovementUpdate, mockContext)
    expect(result).toEqual(keyServices.createKeyMovement(mockKeyMovement, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateKeyMovement(null, mockKeyMovementUpdate, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
