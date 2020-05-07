import {
  showSearchType,
  showBedRange,
  showPriceRange,
  showSearchPropertyType,
  getResultMessage,
  getPriceRange,
} from '../search-helper'

describe('Search-Helper', () => {
  it('getMinPriceRange', () => {
    let result = getPriceRange(false)
    expect(result[0].label).toEqual('No max')
    result = getPriceRange(true)
    expect(result[0].label).toEqual('No min')
    expect(result.length).toBe(95)
  })
  it('getMaxPriceRange', () => {
    const result = getPriceRange()
    expect(result.length).toBe(95)
  })
  it('showSearchTypeFilter', () => {
    expect(showSearchType('Rent')).toEqual('To Rent')
    expect(showSearchType('Sale')).toEqual('For Sale')
  })

  it('showBedRange', () => {
    expect(showBedRange(0, 0)).toEqual('No min - No max bed')
    expect(showBedRange(0, 4)).toEqual('No min - 4 bed')
    expect(showBedRange(1, 0)).toEqual('1 - No max bed')
    expect(showBedRange(1, 4)).toEqual('1 - 4 bed')
  })

  it('showPriceRange', () => {
    expect(showPriceRange(0, 0)).toEqual('No min – No max')
    expect(showPriceRange(0, 200000)).toEqual('No min – £200,000')
    expect(showPriceRange(10000, 0)).toEqual('£10,000 – No max')
    expect(showPriceRange(10000, 200000)).toEqual('£10,000 – £200,000')
  })

  it('showSearchPropertyType', () => {
    expect(showSearchPropertyType('')).toEqual('Property type: All')
    expect(showSearchPropertyType('house')).toEqual('Property type: House')
    expect(showSearchPropertyType('bungalow')).toEqual('Property type: Bungalow')
  })

  describe('getResultMessage', () => {
    it('should return correctly when totalCount = 2 and isRental true', () => {
      const input = {
        properties: {
          _embedded: [{}, {}],
          totalCount: 2,
        },
        searchKeyword: 'mockSearchKeyword',
        searchType: 'Rent' as 'Rent' | 'Sale',
      }
      const result = getResultMessage(input)
      expect(result).toEqual('2 Properties To Rent in mockSearchKeyword')
    })

    it('should return correctly when totalCount = 1 and isRental true', () => {
      const input = {
        properties: {
          _embedded: [{}],
          totalCount: 1,
        },
        searchKeyword: 'mockSearchKeyword',
        searchType: 'Rent' as 'Rent' | 'Sale',
      }
      const result = getResultMessage(input)
      expect(result).toEqual('1 Property To Rent in mockSearchKeyword')
    })

    it('should return correctly when totalCount = 1 and isRental false', () => {
      const input = {
        properties: {
          _embedded: [{}],
          totalCount: 1,
        },
        searchKeyword: 'mockSearchKeyword',
        searchType: 'Sale' as 'Rent' | 'Sale',
      }
      const result = getResultMessage(input)
      expect(result).toEqual('1 Property For Sale in mockSearchKeyword')
    })
  })
})
