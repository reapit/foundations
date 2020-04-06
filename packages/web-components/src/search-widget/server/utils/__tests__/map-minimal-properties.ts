import { mapMinimalProperties } from '../map-minimal-properties'
import { propertiesStub, propertiesMinimalStub } from '../../api/__stubs__/properties'

describe('mappingMinimalProperties', () => {
  it('should return correct minimalResult', () => {
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
})
