import { fetcher } from '@reapit/elements'
import { URLS, BASE_HEADERS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { CreateSubscriptionModel, SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

export const getSubscriptionsService = async (): Promise<SubscriptionModelPagedResult | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: SubscriptionModelPagedResult | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SUBSCRIPTIONS}/?developerId=${session.loginIdentity.developerId}`,
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        'api-version': 'latest',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }

    throw new Error('Failed to fetch subscriptions')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const createSubscriptionsService = async (
  subscription: CreateSubscriptionModel,
): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SUBSCRIPTIONS}`,
      method: 'POST',
      body: subscription,
      headers: {
        ...BASE_HEADERS,
        'api-version': 'latest',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }
    throw new Error('Failed to create subscription')
  } catch (err) {
    console.error('Error', err.message)
  }
}

export const deleteSubscriptionsService = async (id: string): Promise<boolean | undefined> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SUBSCRIPTIONS}/${id}`,
      method: 'DELETE',
      headers: {
        ...BASE_HEADERS,
        'api-version': 'latest',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (response) {
      return response
    }
    throw new Error('Failed to delete subscription')
  } catch (err) {
    console.error('Error', err.message)
  }
}
