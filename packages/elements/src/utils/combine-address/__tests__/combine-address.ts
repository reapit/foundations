import { combineAddress } from '../combine-address'

describe('combineAddress', () => {
  it('should run correctly', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Lindsey Close Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 1', () => {
    const address = {
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 Lindsey Close Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 2', () => {
    const address = {
      buildingName: '123',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = ' 123 Lindsey Close Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 3', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 4', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Lindsey Close Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 5', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Lindsey Close Great Denham Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 6', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      postcode: 'MK40 4GT',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Lindsey Close Great Denham Bedford MK40 4GT'
    expect(result).toEqual(expected)
  })

  it('should run correctly 7', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      country: 'GB',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Lindsey Close Great Denham Bedford Bedfordshire'
    expect(result).toEqual(expected)
  })

  it('should run correctly 8', () => {
    const address = {
      buildingName: '123',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145,
      },
    }
    const result = combineAddress(address)
    const expected = '65 123 Lindsey Close Great Denham Bedford Bedfordshire MK40 4GT'
    expect(result).toEqual(expected)
  })
})
