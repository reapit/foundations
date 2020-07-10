import { generatePropertyBatchLoaderFn, generatePropertyLoader } from '../dataloader'
import { propertyMock } from '../__mocks__/property'
import { propertiesMock } from '../__mocks__/properties'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getPropertyById: jest.fn(() => propertyMock),
  getProperties: jest.fn(() => propertiesMock),
  createProperty: jest.fn(() => true),
  updateProperty: jest.fn(() => true),
}))

describe('property-dataloader', () => {
  describe('generatePropertyBatchLoaderFn', () => {
    it('should run correctly', () => {
      const fn = generatePropertyBatchLoaderFn(mockContext)
      const mockKeys = ['AP']
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })

    it('should run correctly without keys', () => {
      const fn = generatePropertyBatchLoaderFn(mockContext)
      const mockKeys = []
      const result = fn(mockKeys)
      expect(result).toEqual(expect.any(Object))
    })
  })

  describe('generatePropertyLoader', () => {
    it('should return correctly', () => {
      const result = generatePropertyLoader(mockContext)
      expect(result).toEqual(expect.any(Object))
    })
  })
})
