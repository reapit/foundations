import sourceServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetSourceById, queryGetSources, mutationCreateSource, mutationUpdateSource } from '../resolvers'
import { mockCreateSourceArgs } from '../__stubs__/mock-create-source'
import { mockUpdateSourceArgs } from '../__stubs__/mock-update-source'
import { mockSource } from '../__stubs__/mock-source'
import { mockSources } from '../__stubs__/mock-sources'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getSourceById: jest.fn(() => mockSource),
  getSources: jest.fn(() => mockSources),
  createSource: jest.fn(() => true),
  updateSource: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetSourceById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetSourceById(null, args, mockContext)
    expect(result).toEqual(sourceServices.getSourceById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetSourceById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetSources', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetSources(null, args, mockContext)
    expect(result).toEqual(sourceServices.getSources(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetSources(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateSource', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateSource(null, mockCreateSourceArgs, mockContext)
    expect(result).toEqual(sourceServices.createSource(mockCreateSourceArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateSource(null, mockCreateSourceArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateSource', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateSource(null, mockUpdateSourceArgs, mockContext)
    expect(result).toEqual(sourceServices.updateSource(mockUpdateSourceArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateSource(null, mockUpdateSourceArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
