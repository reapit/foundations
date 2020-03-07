import { callGetAreaByIdAPI, callGetAreasAPI, callCreateAreaAPI, callUpdateAreaAPI } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createAreaArgsMock } from '../__mocks__/create-area'
import { updateAreaArgsMock } from '../__mocks__/update-area'
import { getAreaById, getAreas, createArea, updateArea } from '../services'
import { areaMock } from '../__mocks__/area'
import { areasMock } from '../__mocks__/areas'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetAreaByIdAPI: jest.fn(() => Promise.resolve(areaMock)),
  callGetAreasAPI: jest.fn(() => Promise.resolve(areasMock)),
  callCreateAreaAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateAreaAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getAreaById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getAreaById(args, mockContext)
    expect(callGetAreaByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(areaMock)
  })
})

describe('getAreas', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getAreas(args, mockContext)
    expect(callGetAreasAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(areasMock)
  })
})

describe('createArea', () => {
  it('should return correctly', async () => {
    const result = await createArea(createAreaArgsMock, mockContext)
    expect(callCreateAreaAPI).toHaveBeenCalledWith(createAreaArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateArea', () => {
  it('should return correctly', async () => {
    const result = await updateArea(updateAreaArgsMock, mockContext)
    expect(callUpdateAreaAPI).toHaveBeenCalledWith(updateAreaArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
