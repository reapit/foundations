import { mapMinimalProperties } from '../map-minimal-properties'
import { propertiesStub, propertiesMinimalStub } from '../../api/__stubs__/properties'
import { propertyImagesStub, propertyImagesMinimalStub } from '../../api/__stubs__/property-images'

describe('mappingMinimalProperties', () => {
  it('should return correct minimalResult for properties', () => {
    const includedProps = [
      'address',
      'bathrooms',
      'bedrooms',
      'description',
      'id',
      'letting',
      'marketingMode',
      'selling',
      'style',
      'type',
    ]
    const result = mapMinimalProperties(propertiesStub, includedProps)
    expect(result).toEqual(propertiesMinimalStub)
  })

  it('should return correct minimalResult for propertyImages', () => {
    const includedProps = ['id', 'url', 'propertyId']
    const result = mapMinimalProperties(propertyImagesStub, includedProps)
    expect(result).toEqual(propertyImagesMinimalStub)
  })

  it('should return correctly with _embedded undefined', () => {
    const includedProps = ['id', 'url', 'propertyId']
    const propertyImagesStubWithUndefinedEmbedded = { ...propertyImagesStub, _embedded: undefined }
    const result = mapMinimalProperties(propertyImagesStubWithUndefinedEmbedded, includedProps)
    expect(result).toEqual(propertyImagesStubWithUndefinedEmbedded)
  })
})
