import { combineAddress } from '../combine-address'

describe('combineAddress', () => {
  it('should run correctly', () => {
    const address = {
      buildingName: '',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: '',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145
      }
    }
    const result = combineAddress(address)
    const expected = '65 Lindsey Close Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })
})
