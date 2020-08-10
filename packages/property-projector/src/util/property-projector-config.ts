import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'

/**
 *
 * @todo departments should be changed to a single object rather than an array of objects
 */
export const getPropertyProjectorConfig = async (session: ReapitConnectSession) => {
  const propertyProjectorConfig: any = {
    logo: '',
    primaryColour: '',
    secondaryColour: '',
    rotationDuration: 0,
    refreshHour: 0,
    propertyLimit: 25,
    minPrice: 0,
    maxPrice: 0,
    minRent: 0,
    maxRent: 0,
    randomize: false,
    showAddress: true,
    showStrapline: true,
    sortBy: 'created',
    departments: [{ G: ['house', 'bungalow', 'land'] }],
    offices: ['AAA'],
  }

  return propertyProjectorConfig
}
