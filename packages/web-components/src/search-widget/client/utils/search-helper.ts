import { currencyFormatter } from './results-helpers'
import { PickedPagedResultPropertyModel_ } from '../../types'

export const minNumOfBedrooms: { value: number; label: string }[] = [
  { value: 0, label: 'No min' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
]

export const maxNumOfBedrooms: { value: number; label: string }[] = [
  { value: 0, label: 'No max' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
]

export const orderByPrices: { value: string; label: string }[] = [
  { value: '-price', label: 'Price descending' }, // Prefix string with '-' to indicate descending direction
  { value: 'price', label: 'Price ascending' },
]

export const propertyTypes: { value: string; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'house', label: 'House' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'flatApartment', label: 'Flat Apartment' },
  { value: 'maisonette', label: 'Maisonette' },
  { value: 'land', label: 'Land' },
  { value: 'farm', label: 'Farm' },
  { value: 'cottage', label: 'Cottage' },
  { value: 'studio', label: 'Studio' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'developmentPlot', label: 'Development Plot' },
]

export const addedInTimes: { value: string; label: string }[] = [
  { value: '', label: 'Any time' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '3d', label: '3 days' },
  { value: '7d', label: '7 days' },
  { value: '14d', label: '14 days' },
]

export const MIN_PRICE_START = 50000 // £50,000
export const MIN_PRICE_INCREMENT = 10000 // £10,000
export const MIN_PRICE_END = 300000 // £300,000

export const MAX_PRICE_START = 300000 // £300,000
export const MAX_PRICE_INCREMENT = 25000 // £25,000
export const MAX_PRICE_END = 2000000 // £2,000,000

export type PriceRange = { value: number; label: string }

export const getMinPriceRange = (): PriceRange[] => {
  const minPriceRange: PriceRange[] = [{ value: 0, label: 'No min' }]
  let minPriceStart = MIN_PRICE_START
  while (minPriceStart <= MIN_PRICE_END) {
    minPriceRange.push({ value: minPriceStart, label: currencyFormatter.format(minPriceStart) })
    minPriceStart += MIN_PRICE_INCREMENT
  }
  return minPriceRange
}

export const getMaxPriceRange = (): PriceRange[] => {
  const maxPriceRange: PriceRange[] = [{ value: 0, label: 'No max' }]
  let maxPriceStart = MAX_PRICE_START
  while (maxPriceStart <= MAX_PRICE_END) {
    maxPriceRange.push({ value: maxPriceStart, label: currencyFormatter.format(maxPriceStart) })
    maxPriceStart += MAX_PRICE_INCREMENT
  }
  return maxPriceRange
}

export const showSearchType = (type: 'Rent' | 'Sale'): string => {
  return type === 'Rent' ? 'To Rent' : 'For Sell'
}

export const showBedRange = (minBed: number, maxBed: number): string => {
  return `${minBed === 0 ? 'No min' : minBed} - ${maxBed === 0 ? 'No max' : maxBed} bed`
}

export const showPriceRange = (minPrice: number, maxPrice: number): string => {
  return `Price range ${currencyFormatter.format(minPrice)} – ${currencyFormatter.format(maxPrice)}`
}

export const showSearchPropertyType = (propertyType: string): string => {
  const property = propertyTypes.find((type: { value: string; label: string }) => type.value === propertyType)
  return `Property type: ${property?.label}`
}

export const showOrderResultsBy = (orderBy: string = 'price'): string => {
  const orderByObject = orderByPrices.find((type: { value: string; label: string }) => type.value === orderBy)
  return `Order results by: ${orderByObject?.label}`
}

export const showAddedIn = (addedIn: string): string => {
  const addedInObject = addedInTimes.find((type: { value: string; label: string }) => type.value === addedIn)
  return `Added In: ${addedInObject?.label}`
}

export type GetResultMessageParams = {
  properties: PickedPagedResultPropertyModel_
  searchKeyword: string
  searchType: 'Rent' | 'Sale'
  minBeds?: number
  maxBeds?: number
  orderBy?: string
  propertyType?: string
  minPrice?: number
  maxPrice?: number
  addedIn?: string // ignore for now
}

export const getResultMessage = ({
  properties,
  searchKeyword,
  searchType,
  minBeds = 0,
  maxBeds = 0,
  minPrice = 0,
  maxPrice = 0,
  propertyType = '',
  orderBy,
  addedIn = '',
}: GetResultMessageParams) => {
  if (properties && properties._embedded && properties._embedded.length) {
    const numberResults = properties.totalCount
    const resultsMessage = `${numberResults} result${numberResults === 1 ? '' : 's'}${
      searchKeyword.length ? ` for ${searchKeyword},` : ''
    } ${showSearchType(searchType)}, ${showBedRange(minBeds, maxBeds)}, ${showPriceRange(
      minPrice,
      maxPrice,
    )}, ${showSearchPropertyType(propertyType)}, ${showOrderResultsBy(orderBy)}, ${showAddedIn(addedIn)}.`
    return resultsMessage
  }
  return ''
}
