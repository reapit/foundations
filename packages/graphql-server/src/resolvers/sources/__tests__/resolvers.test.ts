import sourceServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetSourceById, queryGetSources, mutationCreateSource, mutationUpdateSource } from '../resolvers'
import { createSourceArgsMock } from '../__stubs__/mock-create-source'
import { updateSourceArgsMock } from '../__stubs__/mock-update-source'
import { sourceMock } from '../__stubs__/mock-source'
import { sourcesMock } from '../__stubs__/mock-sources'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getSourceById: jest.fn(() => sourceMock),
  getSources: jest.fn(() => sourcesMock),
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
    const result = mutationCreateSource(null, createSourceArgsMock, mockContext)
    expect(result).toEqual(sourceServices.createSource(createSourceArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateSource(null, createSourceArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateSource', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateSource(null, updateSourceArgsMock, mockContext)
    expect(result).toEqual(sourceServices.updateSource(updateSourceArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateSource(null, updateSourceArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
