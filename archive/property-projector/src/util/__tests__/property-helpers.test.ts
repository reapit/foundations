import {
  getAddress,
  getPriceString,
  getRentString,
  getSaleStatus,
  getLettingStatus,
  getStatus,
} from '../property-helpers'
import mockProperty from '../__mocks__/property'

describe('getAddress', () => {
  it('should return an address', async () => {
    expect(getAddress(mockProperty)).toEqual('3rd Floor, 67 – 74, Saffron Hill, EC1N 8QX')
  })
})

describe('getPriceString', () => {
  it('should return a price string', async () => {
    expect(getPriceString(mockProperty)).toEqual(
      new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(100000),
    )
  })
})

describe('getRentString', () => {
  it('should return a rent string', async () => {
    expect(getRentString(mockProperty)).toEqual(
      `${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(5000)} per month`,
    )
  })
})

describe('getSaleStatus', () => {
  it('should return a sale status', async () => {
    expect(getSaleStatus(mockProperty)).toEqual('For Sale')
  })
})

describe('getLettingStatus', () => {
  it('should return a letting status', async () => {
    expect(getLettingStatus(mockProperty)).toEqual('To Let')
  })
})

describe('getStatus', () => {
  it('should return a property status', async () => {
    expect(getStatus(mockProperty)).toEqual('To Let')
  })
})

describe('getPrice', () => {
  it('should return a property price', async () => {
    expect(getRentString(mockProperty)).toEqual(
      `${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(5000)} per month`,
    )
  })
})
