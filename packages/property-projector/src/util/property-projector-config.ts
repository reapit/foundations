import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'

/**
 *
 * @todo departments should be changed to a single object rather than an array of objects
 * @todo remove test data
 * @todo add refreshHour - every 'x' hours the projector should refresh when it's open
 */
export const getPropertyProjectorConfig = async (session: ReapitConnectSession): Promise<PropertyProjectorConfig> => {
  const propertyProjectorConfig: any = {
    logo: '',
    primaryColour: '#006580',
    secondaryColour: '#FFFFFF',
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
    departments: [{ G: ['house', 'bungalow', 'land'] }],
    offices: [],
  }

  return propertyProjectorConfig
}
