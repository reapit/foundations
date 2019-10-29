import React from 'react'
import {
  combineAdress,
  combineNumberBedTypeStyle,
  SearchResult,
  formatPriceAndQuantifier
} from './search-result'
import { shallow } from 'enzyme'

describe('SearchResult', () => {
  describe('formatPriceAndQuantifier', () => {
    it('runs correctly', () => {
      // 0 = input, 1 = input
      const testCases = [
        ['askingPrice', '£500,000'],
        ['priceOnApplication', "POA"],
        ['guidePrice', 'Guide Price £500,000'],
        ['offersInRegion', 'OIRO £500,000'],
        ['offersOver', 'Offers Over £500,000'],
        ['offersInExcess', 'OIEO £500,000'],
        ['fixedPrice', 'Fixed Price £500,000'],
        ['priceReducedTo', '£500,000'],
      ]

      for (let testCase of testCases) {
        expect(
          formatPriceAndQuantifier('500000', testCase[0])
        ).toBe(testCase[1])
      }
    })
  })
  it('should match snapshoot', () => {
    const wrapper = shallow(<SearchResult />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handles combineAddress correctly', () => {
    expect(
      combineAdress({
        line1: '1',
        line2: '2',
        line3: '3',
        line4: '4',
        postcode: '5'
      })
    ).toBe('3, 4, 5')
  })

  it('handles combineNumberBedTypeStyle correcly', () => {
    expect(
      combineNumberBedTypeStyle({
        bedrooms: 1,
        style: 'style1 style2',
        type: 'type1 type2'
      })
    ).toBe('1 style1 style2 type1 type2')
  })
})
