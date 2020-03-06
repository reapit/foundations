import negotiatorServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetNegotiatorById,
  queryGetNegotiators,
  mutationCreateNegotiator,
  mutationUpdateNegotiator,
} from '../resolvers'
import { createNegotiatorArgsMock } from '../__mocks__/create-negotiator'
import { updateNegotiatorArgsMock } from '../__mocks__/update-negotiator'
import { negotiatorMock } from '../__mocks__/negotiator'
import { negotiatorsMock } from '../__mocks__/negotiators'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getNegotiatorById: jest.fn(() => negotiatorMock),
  getNegotiators: jest.fn(() => negotiatorsMock),
  createNegotiator: jest.fn(() => true),
  updateNegotiator: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetNegotiatorById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetNegotiatorById(null, args, mockContext)
    expect(result).toEqual(negotiatorServices.getNegotiatorById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetNegotiatorById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetNegotiators', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetNegotiators(null, args, mockContext)
    expect(result).toEqual(negotiatorServices.getNegotiators(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetNegotiators(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateNegotiator', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateNegotiator(null, createNegotiatorArgsMock, mockContext)
    expect(result).toEqual(negotiatorServices.createNegotiator(createNegotiatorArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateNegotiator(null, createNegotiatorArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateNegotiator', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateNegotiator(null, updateNegotiatorArgsMock, mockContext)
    expect(result).toEqual(negotiatorServices.updateNegotiator(updateNegotiatorArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateNegotiator(null, updateNegotiatorArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
