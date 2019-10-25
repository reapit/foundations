import React from 'react'
import {
  combineAdress,
  combineNumberBedTypeStyle,
  SearchResult
} from './search-result'
import { shallow } from 'enzyme'

describe('SearchResult', () => {
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
