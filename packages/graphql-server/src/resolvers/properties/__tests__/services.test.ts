import { callGetPropertyByIdAPI, callGetPropertiesAPI, callCreatePropertyAPI, callUpdatePropertyAPI } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createPropertyArgsMock } from '../__mocks__/create-property'
import { updatePropertyArgsMock } from '../__mocks__/update-property'
import { getPropertyById, getProperties, createProperty, updateProperty } from '../services'
import { propertyMock } from '../__mocks__/property'
import { propertiesMock } from '../__mocks__/properties'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetPropertyByIdAPI: jest.fn(() => Promise.resolve(propertyMock)),
  callGetPropertiesAPI: jest.fn(() => Promise.resolve(propertiesMock)),
  callCreatePropertyAPI: jest.fn(() => Promise.resolve(true)),
  callUpdatePropertyAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getPropertyById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getPropertyById(args, mockContext)
    expect(callGetPropertyByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(propertyMock)
  })
})

describe('getProperties', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getProperties(args, mockContext)
    expect(callGetPropertiesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(propertiesMock)
  })
})

describe('createProperty', () => {
  it('should return correctly', async () => {
    const result = await createProperty(createPropertyArgsMock, mockContext)
    expect(callCreatePropertyAPI).toHaveBeenCalledWith(createPropertyArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateProperty', () => {
  it('should return correctly', async () => {
    const result = await updateProperty(updatePropertyArgsMock, mockContext)
    expect(callUpdatePropertyAPI).toHaveBeenCalledWith(updatePropertyArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
