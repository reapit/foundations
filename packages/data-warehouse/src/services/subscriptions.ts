import { fetcher } from '@reapit/elements'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { CreateSubscriptionModel, SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { getPlatformHeaders, logger } from '@reapit/utils'

export const getSubscriptionsService = async (): Promise<SubscriptionModelPagedResult | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const response: SubscriptionModelPagedResult | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SUBSCRIPTIONS}/?customerId=${session.loginIdentity.clientId}`,
      method: 'GET',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })

    if (response) {
      return response
    }
    throw new Error('Failed to fetch subscriptions')
  } catch (err) {
    logger(err)
  }
}

export const createSubscriptionsService = async (
  subscription: CreateSubscriptionModel,
): Promise<boolean | undefined> => {
  try {
    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SUBSCRIPTIONS}`,
      method: 'POST',
      body: subscription,
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })

    if (response) {
      return response
    }
    throw new Error('Failed to create subscription')
  } catch (err) {
    logger(err)
  }
}

export const deleteSubscriptionsService = async (id: string): Promise<boolean | undefined> => {
  try {
    const response: boolean | undefined = await fetcher({
      api: window.reapit.config.platformApiUrl,
      url: `${URLS.SUBSCRIPTIONS}/${id}`,
      method: 'DELETE',
      headers: await getPlatformHeaders(reapitConnectBrowserSession, 'latest'),
    })

    if (response) {
      return response
    }
    throw new Error('Failed to delete subscription')
  } catch (err) {
    logger(err)
  }
}
