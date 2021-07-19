import areaServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetAreaById, queryGetAreas, mutationCreateArea, mutationUpdateArea } from '../resolvers'
import { mockCreateAreaArgs } from '../__stubs__/mock-create-area'
import { mockUpdateAreaArgs } from '../__stubs__/mock-update-area'
import { mockArea } from '../__stubs__/mock-area'
import { mockAreas } from '../__stubs__/mock-areas'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getAreaById: jest.fn(() => mockArea),
  getAreas: jest.fn(() => mockAreas),
  createArea: jest.fn(() => true),
  updateArea: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetAreaById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetAreaById(null, args, mockContext)
    expect(result).toEqual(areaServices.getAreaById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetAreaById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetAreas', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetAreas(null, args, mockContext)
    expect(result).toEqual(areaServices.getAreas(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetAreas(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateArea', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateArea(null, mockCreateAreaArgs, mockContext)
    expect(result).toEqual(areaServices.createArea(mockCreateAreaArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateArea(null, mockCreateAreaArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateArea', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateArea(null, mockUpdateAreaArgs, mockContext)
    expect(result).toEqual(areaServices.updateArea(mockUpdateAreaArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateArea(null, mockUpdateAreaArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
