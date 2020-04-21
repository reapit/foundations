import {
  getMinPriceRange,
  getMaxPriceRange,
  showSearchType,
  showBedRange,
  showPriceRange,
  showSearchPropertyType,
  showOrderResultsBy,
  showAddedIn,
  getResultMessage,
} from '../search-helper'

describe('Search-Helper', () => {
  it('getMinPriceRange', () => {
    const result = getMinPriceRange()
    expect(result.length).toBe(27)
  })
  it('getMaxPriceRange', () => {
    const result = getMaxPriceRange()
    expect(result.length).toBe(70)
  })
  it('showSearchTypeFilter', () => {
    expect(showSearchType('Rent')).toEqual('To Rent')
    expect(showSearchType('Sale')).toEqual('For Sell')
  })

  it('showBedRange', () => {
    expect(showBedRange(0, 0)).toEqual('No min - No max bed')
    expect(showBedRange(0, 4)).toEqual('No min - 4 bed')
    expect(showBedRange(1, 0)).toEqual('1 - No max bed')
    expect(showBedRange(1, 4)).toEqual('1 - 4 bed')
  })

  it('showPriceRange', () => {
    expect(showPriceRange(0, 0)).toEqual('Price range £0 – £0')
    expect(showPriceRange(0, 200000)).toEqual('Price range £0 – £200,000')
    expect(showPriceRange(10000, 0)).toEqual('Price range £10,000 – £0')
    expect(showPriceRange(10000, 200000)).toEqual('Price range £10,000 – £200,000')
  })

  it('showSearchPropertyType', () => {
    expect(showSearchPropertyType('')).toEqual('Property type: All')
    expect(showSearchPropertyType('house')).toEqual('Property type: House')
    expect(showSearchPropertyType('bungalow')).toEqual('Property type: Bungalow')
  })

  it('showOrderResultsBy', () => {
    expect(showOrderResultsBy('price')).toEqual('Order results by: Price ascending')
    expect(showOrderResultsBy('-price')).toEqual('Order results by: Price descending')
  })

  it('showAddedIn', () => {
    expect(showAddedIn('')).toEqual('Added In: Any time')
    expect(showAddedIn('24h')).toEqual('Added In: Last 24 Hours')
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
      expect(result).toEqual(
        '2 results for mockSearchKeyword, To Rent, No min - No max bed, Price range £0 – £0, ' +
          'Property type: All, Order results by: Price ascending, Added In: Any time.',
      )
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
      expect(result).toEqual(
        '1 result for mockSearchKeyword, To Rent, No min - No max bed, Price range £0 – £0, ' +
          'Property type: All, Order results by: Price ascending, Added In: Any time.',
      )
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
      expect(result).toEqual(
        '1 result for mockSearchKeyword, For Sell, No min - No max bed, Price range £0 – £0, ' +
          'Property type: All, Order results by: Price ascending, Added In: Any time.',
      )
    })
  })
})
