import { callGetAreaByIdAPI, callGetAreasAPI, callCreateAreaAPI, callUpdateAreaAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateAreaArgs } from '../__stubs__/mock-create-area'
import { mockUpdateAreaArgs } from '../__stubs__/mock-update-area'
import { getAreaById, getAreas, createArea, updateArea } from '../services'
import { mockArea } from '../__stubs__/mock-area'
import { mockAreas } from '../__stubs__/mock-areas'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetAreaByIdAPI: jest.fn(() => Promise.resolve(mockArea)),
  callGetAreasAPI: jest.fn(() => Promise.resolve(mockAreas)),
  callCreateAreaAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateAreaAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getAreaById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getAreaById(args, mockContext)
    expect(callGetAreaByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockArea)
  })
})

describe('getAreas', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getAreas(args, mockContext)
    expect(callGetAreasAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockAreas)
  })
})

describe('createArea', () => {
  it('should return correctly', async () => {
    const result = await createArea(mockCreateAreaArgs, mockContext)
    expect(callCreateAreaAPI).toHaveBeenCalledWith(mockCreateAreaArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateArea', () => {
  it('should return correctly', async () => {
    const result = await updateArea(mockUpdateAreaArgs, mockContext)
    expect(callUpdateAreaAPI).toHaveBeenCalledWith(mockUpdateAreaArgs, mockContext)
    expect(result).toEqual(true)
  })
})
