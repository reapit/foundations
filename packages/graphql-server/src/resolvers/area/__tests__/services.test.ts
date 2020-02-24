import { callGetAreasAPI, callCreateAreaAPI, callGetAreaByIdAPI, callUpdateArea } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createAreaArgs } from '../__mocks__/createArea'
import { updateAreaArgs } from '../__mocks__/updateArea'
import { getAreaById, getAreas, createArea, updateArea } from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetAreasAPI: jest.fn(() => 'callGetAreasAPI'),
  callCreateAreaAPI: jest.fn(() => 'callCreateAreaAPI'),
  callGetAreaByIdAPI: jest.fn(() => 'callGetAreaByIdAPI'),
  callUpdateArea: jest.fn(() => 'callUpdateArea'),
}))

describe('getAreaById', () => {
  it('should return correctly', () => {
    const args = { id: 'id' }
    const result = getAreaById(args, mockContext)
    expect(callGetAreaByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual('callGetAreaByIdAPI')
  })
})

describe('getAreas', () => {
  it('should return correctly', () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = getAreas(args, mockContext)
    expect(callGetAreasAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual('callGetAreasAPI')
  })
})

describe('createArea', () => {
  it('should return correctly', () => {
    const result = createArea(createAreaArgs, mockContext)
    expect(callCreateAreaAPI).toHaveBeenCalledWith(createAreaArgs, mockContext)
    expect(result).toEqual('callCreateAreaAPI')
  })
})

describe('updateArea', () => {
  it('should return correctly', () => {
    const result = updateArea(updateAreaArgs, mockContext)
    expect(callUpdateArea).toHaveBeenCalledWith(updateAreaArgs, mockContext)
    expect(result).toEqual('callUpdateArea')
  })
})
