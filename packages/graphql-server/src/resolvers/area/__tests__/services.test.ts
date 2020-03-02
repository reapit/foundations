import { callGetAreasAPI, callCreateAreaAPI, callGetAreaByIdAPI, callUpdateArea } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createAreaArgs } from '../__mocks__/createArea'
import { updateAreaArgs } from '../__mocks__/updateArea'
import { getAreaById, getAreas, createArea, updateArea } from '../services'
import { area } from '../__mocks__/area'
import { areas } from '../__mocks__/areas'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetAreaByIdAPI: jest.fn(() => Promise.resolve(area)),
  callGetAreasAPI: jest.fn(() => Promise.resolve(areas)),
  callCreateAreaAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateArea: jest.fn(() => Promise.resolve(true)),
}))

describe('getAreaById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getAreaById(args, mockContext)
    expect(callGetAreaByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(area)
  })
})

describe('getAreas', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getAreas(args, mockContext)
    expect(callGetAreasAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(areas)
  })
})

describe('createArea', () => {
  it('should return correctly', async () => {
    const result = await createArea(createAreaArgs, mockContext)
    expect(callCreateAreaAPI).toHaveBeenCalledWith(createAreaArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateArea', () => {
  it('should return correctly', async () => {
    const result = await updateArea(updateAreaArgs, mockContext)
    expect(callGetAreaByIdAPI).toHaveBeenCalledWith({ id: updateAreaArgs.id }, mockContext)
    expect(callUpdateArea).toHaveBeenCalledWith({ ...updateAreaArgs, _eTag: area._eTag }, mockContext)
    expect(result).toEqual(true)
  })
})
