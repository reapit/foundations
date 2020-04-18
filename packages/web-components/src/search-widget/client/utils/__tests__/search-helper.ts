import {
  getMinPriceRange,
  getMaxPriceRange,
  showSearchTypeFilter,
  showBedRange,
  showSearchPropertyType,
  showOrderResultsBy,
  showAddedIn,
} from '../search-helper'

describe('image-helpers', () => {
  it('getMinPriceRange', () => {
    const result = getMinPriceRange()
    expect(result.length).toBe(27)
  })
  it('getMaxPriceRange', () => {
    const result = getMaxPriceRange()
    expect(result.length).toBe(70)
  })
  it('showSearchTypeFilter', () => {
    expect(showSearchTypeFilter('Rent')).toEqual('To Rent')
    expect(showSearchTypeFilter('Sale')).toEqual('For Sell')
  })

  it('showBedRange', () => {
    expect(showBedRange(0, 0)).toEqual('No min - No max bed')
    expect(showBedRange(0, 4)).toEqual('No min - 4 bed')
    expect(showBedRange(1, 0)).toEqual('1 - No max bed')
    expect(showBedRange(1, 4)).toEqual('1 - 4 bed')
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
})
