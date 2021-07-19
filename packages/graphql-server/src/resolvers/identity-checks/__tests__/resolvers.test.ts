import identityCheckServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetIdentityCheckById,
  queryGetIdentityChecks,
  mutationCreateIdentityCheck,
  mutationUpdateIdentityCheck,
} from '../resolvers'
import { mockCreateIdentityCheckArgs } from '../__stubs__/mock-create-identity-check'
import { mockUpdateIdentityCheckArgs } from '../__stubs__/mock-update-identity-check'
import { mockIdentityCheck } from '../__stubs__/mock-identity-check'
import { mockIdentityChecks } from '../__stubs__/mock-identity-checks'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getIdentityCheckById: jest.fn(() => mockIdentityCheck),
  getIdentityChecks: jest.fn(() => mockIdentityChecks),
  createIdentityCheck: jest.fn(() => true),
  updateIdentityCheck: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetIdentityCheckById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetIdentityCheckById(null, args, mockContext)
    expect(result).toEqual(identityCheckServices.getIdentityCheckById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetIdentityCheckById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetIdentityChecks', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetIdentityChecks(null, args, mockContext)
    expect(result).toEqual(identityCheckServices.getIdentityChecks(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetIdentityChecks(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateIdentityCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateIdentityCheck(null, mockCreateIdentityCheckArgs, mockContext)
    expect(result).toEqual(identityCheckServices.createIdentityCheck(mockCreateIdentityCheckArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateIdentityCheck(null, mockCreateIdentityCheckArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateIdentityCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateIdentityCheck(null, mockUpdateIdentityCheckArgs, mockContext)
    expect(result).toEqual(identityCheckServices.updateIdentityCheck(mockUpdateIdentityCheckArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateIdentityCheck(null, mockUpdateIdentityCheckArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
