import identityCheckServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetIdentityCheckById,
  queryGetIdentityChecks,
  mutationCreateIdentityCheck,
  mutationUpdateIdentityCheck,
} from '../resolvers'
import { createIdentityCheckArgsMock } from '../__mocks__/create-identity-check'
import { updateIdentityCheckArgsMock } from '../__mocks__/update-identity-check'
import { identityCheckMock } from '../__mocks__/identity-check'
import { identityChecksMock } from '../__mocks__/identity-checks'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getIdentityCheckById: jest.fn(() => identityCheckMock),
  getIdentityChecks: jest.fn(() => identityChecksMock),
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
    const result = mutationCreateIdentityCheck(null, createIdentityCheckArgsMock, mockContext)
    expect(result).toEqual(identityCheckServices.createIdentityCheck(createIdentityCheckArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateIdentityCheck(null, createIdentityCheckArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateIdentityCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateIdentityCheck(null, updateIdentityCheckArgsMock, mockContext)
    expect(result).toEqual(identityCheckServices.updateIdentityCheck(updateIdentityCheckArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateIdentityCheck(null, updateIdentityCheckArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
