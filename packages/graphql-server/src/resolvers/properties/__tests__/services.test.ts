import { callGetPropertyByIdAPI, callGetPropertiesAPI, callCreatePropertyAPI, callUpdatePropertyAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreatePropertyArgs } from '../__stubs__/mock-create-property'
import { mockUpdatePropertyArgs } from '../__stubs__/mock-update-property'
import { getPropertyById, getProperties, createProperty, updateProperty } from '../services'
import { mockProperty } from '../__stubs__/mock-property'
import { mockProperties } from '../__stubs__/mock-properties'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetPropertyByIdAPI: jest.fn(() => Promise.resolve(mockProperty)),
  callGetPropertiesAPI: jest.fn(() => Promise.resolve(mockProperties)),
  callCreatePropertyAPI: jest.fn(() => Promise.resolve(true)),
  callUpdatePropertyAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getPropertyById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getPropertyById(args, mockContext)
    expect(callGetPropertyByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockProperty)
  })
})

describe('getProperties', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getProperties(args, mockContext)
    expect(callGetPropertiesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockProperties)
  })
})

describe('createProperty', () => {
  it('should return correctly', async () => {
    const result = await createProperty(mockCreatePropertyArgs, mockContext)
    expect(callCreatePropertyAPI).toHaveBeenCalledWith(mockCreatePropertyArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateProperty', () => {
  it('should return correctly', async () => {
    const result = await updateProperty(mockUpdatePropertyArgs, mockContext)
    expect(callUpdatePropertyAPI).toHaveBeenCalledWith(mockUpdatePropertyArgs, mockContext)
    expect(result).toEqual(true)
  })
})
