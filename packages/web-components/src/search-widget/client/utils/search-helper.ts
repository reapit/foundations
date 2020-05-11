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

export const PRICE_RANGE_START = 50000 // £50,000
export const PRICE_RANGE_INCREMENT_LEVEL1 = 10000 // £10,000
export const PRICE_RANGE_INCREMENT_LEVEL2 = 25000 // £25,000
export const PRICE_RANGE_END_LEVEL1 = 300000 // £300,000
export const PRICE_RANGE_END_LEVEL2 = 2000000 // £2,000,000

export type PriceRange = { value: number; label: string }
/**
 * Price From and To: Start at £50,000 and increment by £10,000
 * So £50,000, £60,000, £70,000 etc
 * Go up to £300,000 and from there increment by £25,000
 * So £300,000, £325,000, £350,000
 * Stop at £2,000,000
 */
export const getPriceRange = (isMinimum: boolean = true): PriceRange[] => {
  const priceRange: PriceRange[] = [{ value: 0, label: isMinimum ? 'No min' : 'No max' }]
  let priceStart = PRICE_RANGE_START
  while (priceStart <= PRICE_RANGE_END_LEVEL2) {
    priceRange.push({ value: priceStart, label: currencyFormatter.format(priceStart) })
    priceStart += priceStart < PRICE_RANGE_END_LEVEL1 ? PRICE_RANGE_INCREMENT_LEVEL1 : PRICE_RANGE_INCREMENT_LEVEL2
  }
  return priceRange
}

export const showSearchType = (type: 'Rent' | 'Sale'): string => {
  return type === 'Rent' ? 'To Rent' : 'For Sale'
}

export const showBedRange = (minBed: number, maxBed: number): string => {
  return `${minBed === 0 ? 'No min' : minBed} - ${maxBed === 0 ? 'No max' : maxBed} bed`
}

export const showPriceRange = (minPrice: number, maxPrice: number): string => {
  return `${minPrice === 0 ? 'No min' : currencyFormatter.format(minPrice)} – ${
    maxPrice === 0 ? 'No max' : currencyFormatter.format(maxPrice)
  }`
}

export const showSearchPropertyType = (propertyType: string): string => {
  const property = propertyTypes.find((type: { value: string; label: string }) => type.value === propertyType)
  return `Property type: ${property?.label}`
}

export type GetResultMessageParams = {
  properties: PickedPagedResultPropertyModel_
  searchKeyword: string
  searchType: 'Rent' | 'Sale'
  minBeds?: number
  maxBeds?: number
  propertyType?: string
  minPrice?: number
  maxPrice?: number
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
}: GetResultMessageParams) => {
  if (properties && properties._embedded && properties._embedded.length > 0) {
    const numberResults = properties.totalCount
    let resultsMessage = `${numberResults} ${numberResults === 1 ? 'Property' : 'Properties'} ${showSearchType(
      searchType,
    )} in ${searchKeyword}`
    const filterMessages = []
    if (minBeds !== 0 || maxBeds !== 0) {
      filterMessages.push(showBedRange(minBeds, maxBeds))
    }
    if (minPrice !== 0 || maxPrice !== 0) {
      filterMessages.push(showPriceRange(minPrice, maxPrice))
    }
    if (propertyType) {
      filterMessages.push(showSearchPropertyType(propertyType))
    }
    return `${resultsMessage}${filterMessages.length > 0 ? `: ${filterMessages.join(', ')}` : ''}`
  }
  return "We couldn't find any properties that match your search criteria, please refine your search"
}
