import { PropertyProjectorConfig } from '@/types/global'

const mockPropertyProjectorConfig: PropertyProjectorConfig = {
  logo: 'SOME_LOGO',
  primaryColour: 'SOME_PRIMARY_COLOUR',
  secondaryColour: 'SOME_SECONDARY_COLOUR',
  headerTextColour: 'SOME_HEADER_TEXT_COLOUR',
  interval: 5,
  propertyLimit: 25,
  marketingMode: ['selling', 'letting'],
  sellingStatuses: ['forSale', 'underOffer'],
  lettingStatuses: ['toLet', 'underOffer'],
  minPrice: 0,
  maxPrice: 0,
  minRent: 0,
  maxRent: 0,
  showAddress: true,
  sortBy: 'created',
  departments: {},
  offices: [],
}

export default mockPropertyProjectorConfig
