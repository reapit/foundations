import {
  combineAddress,
  combineNumberBedTypeStyle,
  formatPriceAndQuantifier,
  formatStyle,
  formatType,
  getPrice,
} from '../results-helpers'

import { propertyStub } from '../__stubs__/property'

describe('results helpers', () => {
  describe('getPrice', () => {
    it('runs correctly', () => {
      expect(getPrice(propertyStub, 'Rent')).toEqual('£750 Monthly')
      expect(getPrice(propertyStub, 'Sale')).toEqual('£250,000')
    })
  })
  it('runs formatPriceAndQuantifier correctly', () => {
    // 0 = input, 1 = input
    const testCases = [
      ['askingPrice', '£500,000'],
      ['priceOnApplication', 'POA'],
      ['guidePrice', 'Guide Price £500,000'],
      ['offersInRegion', 'OIRO £500,000'],
      ['offersOver', 'Offers Over £500,000'],
      ['offersInExcess', 'OIEO £500,000'],
      ['fixedPrice', 'Fixed Price £500,000'],
      ['priceReducedTo', '£500,000'],
      ['default', '500000 default'],
    ]

    for (let testCase of testCases) {
      expect(formatPriceAndQuantifier(500000, testCase[0])).toBe(testCase[1])
    }
  })

  it('format style correctly using formatStyle', () => {
    // 0 = input, 1 = input
    const testCases = [
      ['terraced', 'Terraced'],
      ['endTerrace', 'End of Terrace'],
      ['detached', 'Detached'],
      ['semiDetached', 'Semi Detached'],
      ['linkDetached', 'Link Detached'],
      ['basement', 'Basement'],
      ['groundFloor', 'Ground floor'],
      ['firstFloor', 'First floor'],
      ['upperFloor', 'Upper floor'],
      ['upperFloorWithLift', 'Upper floor with lift'],
    ]

    for (let testCase of testCases) {
      expect(formatStyle(testCase[0])).toBe(testCase[1])
    }
  })

  it('format type correctly using formatType', () => {
    // 0 = input, 1 = input
    const testCases = [
      ['house', 'House'],
      ['bungalow', 'Bungalow'],
      ['flatApartment', 'Flat/Apartment'],
      ['maisonette', 'Maisonette'],
      ['land', 'Land'],
      ['farm', 'Farm'],
      ['developmentPlot', 'Development Plot'],
      ['cottage', 'Cottage'],
    ]

    for (let testCase of testCases) {
      expect(formatType(testCase[0])).toBe(testCase[1])
    }
  })

  it('handles combineAddress correctly', () => {
    expect(
      combineAddress({
        line1: '1',
        line2: '2',
        line3: '3',
        line4: '4',
        postcode: '5',
      }),
    ).toBe('2, 3, 4, 5')

    expect(combineAddress(undefined)).toBe('')
  })

  it('handles combineNumberBedTypeStyle correcly', () => {
    expect(
      combineNumberBedTypeStyle({
        bedrooms: 1,
        style: ['style1', 'style2'],
        type: ['type1', 'type2'],
      }),
    ).toBe('1 Bed style1 style2 type1 type2')
  })
})
