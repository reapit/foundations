import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'
import { getNegotiatorOfficeId } from './negotiator-helper'

export const getPropertyProjectorConfig = async (session: ReapitConnectSession): Promise<PropertyProjectorConfig> => {
  const defaultPropertyProjectorConfig: PropertyProjectorConfig = {
    logo: '',
    primaryColour: '#006580',
    secondaryColour: '#FFFFFF',
    interval: 5,
    propertyLimit: 25,
    marketingMode: ['sales', 'lettings'],
    sellingStatus: ['forSale', 'underOffer'],
    lettingStatus: ['toLet', 'underOffer'],
    minPrice: 0,
    maxPrice: 0,
    minRent: 0,
    maxRent: 0,
    showAddress: true,
    sortBy: 'created',
    departments: {},
    offices: [],
  }

  const officeId = await getNegotiatorOfficeId(session)
  const clientId = session.loginIdentity.clientId ?? 'RPT'

  try {
    const response = await fetch(
      `${window.reapit.config.dynamoEnv}/dev/v1/property-projector-config/${clientId}/${officeId}`,
    )
    const data = await response.json()

    // check for error response
    if (!response.ok) {
      // get error message from body or default to response statusText
      const error = (data && data.message) || response.statusText
      throw new Error(error)
    }

    delete data['customerId']
    delete data['officeId']

    return { ...defaultPropertyProjectorConfig, ...data }
  } catch (e) {
    console.error('There was an error retrieving the configuration.', e)
  }

  return defaultPropertyProjectorConfig
}
