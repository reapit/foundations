import { mapMinimalProperties } from '../map-minimal-properties'
import { propertiesStub, propertiesMinimalStub } from '../../api/__stubs__/properties'
import { propertyImagesStub, propertyImagesMinimalStub } from '../../api/__stubs__/property-images'
import { INCLUDED_PROPS } from '../../constants/api'

describe('mapMinimalProperties', () => {
  it('should return correct minimalResult for properties', () => {
    const result = mapMinimalProperties(propertiesStub, INCLUDED_PROPS.GET_PROPERTIES)
    expect(result).toEqual(propertiesMinimalStub)
  })

  it('should return correct minimalResult for propertyImages', () => {
    const result = mapMinimalProperties(propertyImagesStub, INCLUDED_PROPS.GET_PROPERTY_IMAGES)
    expect(result).toEqual(propertyImagesMinimalStub)
  })

  it('should return correctly with _embedded undefined', () => {
    const propertyImagesStubWithUndefinedEmbedded = { ...propertyImagesStub, _embedded: undefined }
    const result = mapMinimalProperties(propertyImagesStubWithUndefinedEmbedded, INCLUDED_PROPS.GET_PROPERTY_IMAGES)
    expect(result).toEqual(propertyImagesStubWithUndefinedEmbedded)
  })
})
