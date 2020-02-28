import areaServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from '../resolvers'
import { createAreaArgs } from '../__mocks__/createArea'
import { updateAreaArgs } from '../__mocks__/updateArea'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getAreaById: jest.fn(() => 'getAreaById'),
  getAreas: jest.fn(() => 'getAreas'),
  createArea: jest.fn(() => 'createArea'),
  updateArea: jest.fn(() => 'updateArea'),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryArea', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryArea(null, args, mockContext)
    expect(result).toEqual(areaServices.getAreaById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryArea(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryAreas', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryAreas(null, args, mockContext)
    expect(result).toEqual(areaServices.getAreas(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryAreas(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateArea', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateArea(null, createAreaArgs, mockContext)
    expect(result).toEqual(areaServices.createArea(createAreaArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateArea(null, createAreaArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateArea', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateArea(null, updateAreaArgs, mockContext)
    expect(result).toEqual(areaServices.updateArea(updateAreaArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateArea(null, updateAreaArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
