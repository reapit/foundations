import { mapMinimalProperty } from '../map-minimal-property'
import { propertyStub, propertyMinimalStub } from '../../api/__stubs__/property'
import { INCLUDED_PROPS } from '../../constants/api'

describe('mapMinimalProperty', () => {
  it('should return correct minimalResult for property', () => {
    const result = mapMinimalProperty(propertyStub, INCLUDED_PROPS.GET_PROPERTIES)
    expect(result).toEqual(propertyMinimalStub)
  })
})
