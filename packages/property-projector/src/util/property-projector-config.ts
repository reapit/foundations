import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'
import { fetcher } from '@reapit/elements'

export const savePropertyProjectorConfig = async (
  session: ReapitConnectSession,
  officeId: string,
  config: PropertyProjectorConfig,
): Promise<boolean> => {
  const clientId = session.loginIdentity.clientId ?? 'RPT'

  try {
    await fetcher({
      api: window.reapit.config.dynamoEnv,
      url: `/dev/v1/property-projector-config/${clientId}/${officeId}`,
      method: 'PUT',
      body: JSON.stringify(config),
      headers: { 'content-type': 'application/json' },
    })

    return true
  } catch (e) {
    console.error('There was an error retrieving the configuration.', e)
  }
  return false
}

export const getPropertyProjectorConfig = async (
  session: ReapitConnectSession,
  officeId: string,
): Promise<PropertyProjectorConfig> => {
  const defaultPropertyProjectorConfig: PropertyProjectorConfig = {
    logo: '',
    primaryColour: '#006580',
    secondaryColour: '#FFFFFF',
    headerTextColour: '#FFFFFF',
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

  const clientId = session.loginIdentity.clientId ?? 'RPT'

  try {
    const data = await fetcher({
      api: window.reapit.config.dynamoEnv,
      url: `/dev/v1/property-projector-config/${clientId}/${officeId}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })

    delete data['customerId']
    delete data['officeId']

    return { ...defaultPropertyProjectorConfig, ...data }
  } catch (e) {
    console.error('There was an error retrieving the configuration.', e)
  }

  return defaultPropertyProjectorConfig
}
