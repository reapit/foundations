// import { getLatLng } from '../map-helper'
// import { property } from '../__mocks__/property'

// describe('getLatLng', () => {
//   it('should run correctly', () => {
//     const result = getLatLng(property)
//     expect(result).toEqual({
//       latitude: property?.address?.geolocation?.latitude,
//       longitude: property?.address?.geolocation?.longitude,
//     })
//   })
//   it('should return value when property address empty', () => {
//     const newProperty = {
//       ...property,
//       address: {},
//     }
//     const result = getLatLng(newProperty)
//     expect(result).toEqual({ latitude: undefined, longitude: undefined })
//   })
// })
