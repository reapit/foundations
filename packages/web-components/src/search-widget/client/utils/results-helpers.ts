import { ContactAddressModel } from '@reapit/foundations-ts-definitions'
import { PickedPropertyModel, PickedPagedResultPropertyModel_ } from '../../types'

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
})

export const formatPriceAndQuantifier = (price: number, quantifier: string) => {
  const formattedPrice = currencyFormatter.format(price)
  switch (quantifier) {
    case 'askingPrice':
      return formattedPrice
    case 'priceOnApplication':
      return 'POA'
    case 'guidePrice':
      return `Guide Price ${formattedPrice}`
    case 'offersInRegion':
      return `OIRO ${formattedPrice}`
    case 'offersOver':
      return `Offers Over ${formattedPrice}`
    case 'offersInExcess':
      return `OIEO ${formattedPrice}`
    case 'fixedPrice':
      return `Fixed Price ${formattedPrice}`
    case 'priceReducedTo':
      return formattedPrice
    default:
      return `${price} ${quantifier}`
  }
}

export const formatStyle = (style: string) => {
  switch (style) {
    case 'terraced':
      return 'Terraced'
    case 'endTerrace':
      return 'End of Terrace'
    case 'detached':
      return 'Detached'
    case 'semiDetached':
      return 'Semi Detached'
    case 'linkDetached':
      return 'Link Detached'
    case 'basement':
      return 'Basement'
    case 'groundFloor':
      return 'Ground floor'
    case 'firstFloor':
      return 'First floor'
    case 'upperFloor':
      return 'Upper floor'
    case 'upperFloorWithLift':
      return 'Upper floor with lift'
    default:
      return style
  }
}

export const formatType = (style: string) => {
  switch (style) {
    case 'house':
      return 'House'
    case 'bungalow':
      return 'Bungalow'
    case 'flatApartment':
      return 'Flat/Apartment'
    case 'maisonette':
      return 'Maisonette'
    case 'land':
      return 'Land'
    case 'farm':
      return 'Farm'
    case 'developmentPlot':
      return 'Development Plot'
    case 'cottage':
      return 'Cottage'
    default:
      return style
  }
}

export const combineAddress = (address: ContactAddressModel | undefined): string => {
  if (!address) return ''
  const { line2, line3, line4, postcode } = address
  return [line2, line3, line4, postcode].reduce((prev, next, index) => {
    if (next) {
      return `${prev}${index ? ', ' : ''}${next}`
    }
    return prev
  }, '') as string
}

export const getPrice = (result: PickedPropertyModel, searchType: 'Sale' | 'Rent') => {
  if (searchType === 'Rent') {
    const rent = result?.letting?.rent || 0
    const formattedPrice = currencyFormatter.format(rent)
    const rentFrequency = result?.letting?.rentFrequency || ''
    const displayRentFrequency = `${rentFrequency.charAt(0).toUpperCase()}${rentFrequency.substr(
      1,
      rentFrequency.length - 1,
    )}`
    return `${formattedPrice} ${displayRentFrequency}`
  }

  const price = result?.selling?.price ?? 0
  const qualifier = result?.selling?.qualifier ?? ''
  return formatPriceAndQuantifier(price, qualifier)
}

export const combineNumberBedTypeStyle = (result: PickedPropertyModel) => {
  const style = (result?.style || []).map(formatStyle).join(' ')
  const type = (result?.type || []).map(formatType).join(' ')
  const numberBedRoom = result?.bedrooms || 0
  return `${numberBedRoom} Bed ${style} ${type}`
}

export const calculateTotalPage = (totalRecord: number) => {
  if (!totalRecord) {
    return 1
  }
  const ITEM_PER_PAGE = 8
  const totalPage = Math.ceil(totalRecord / ITEM_PER_PAGE)
  return totalPage
}

export type GetResultMessageParams = {
  properties: PickedPagedResultPropertyModel_
  searchKeyword: string
  isRental: boolean
}

export const getResultMessage = ({ properties, searchKeyword, isRental }: GetResultMessageParams) => {
  if (properties && properties._embedded && properties._embedded.length) {
    const numberResults = properties.totalCount
    const resultsMessage = `${numberResults} result${numberResults === 1 ? '' : 's'}${
      searchKeyword.length ? ` for ${searchKeyword},` : ''
    } for ${isRental ? 'rent' : 'sale'}`
    return resultsMessage
  }
  return ''
}
