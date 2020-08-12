import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'

/**
 *
 * @todo departments should be changed to a single object rather than an array of objects
 * @todo remove test data
 * @todo add marketingMode
 * @todo hook up the min/max rent
 * @todo add lettingStatus / saleStatus
 * @todo add refreshHour - every 'x' hours the projector should refresh when it's open
 * @todo add strapline
 */
export const getPropertyProjectorConfig = async (session: ReapitConnectSession) => {
  const propertyProjectorConfig: any = {
    logo: '',
    primaryColour: '',
    secondaryColour: '',
    interval: 0,
    propertyLimit: 25,
    minPrice: 0,
    maxPrice: 0,
    minRent: 0,
    maxRent: 0,
    randomize: false,
    showAddress: true,
    sortBy: 'created',
    departments: [{ G: ['house', 'bungalow', 'land'] }],
    offices: [],
  }

  return propertyProjectorConfig
}
