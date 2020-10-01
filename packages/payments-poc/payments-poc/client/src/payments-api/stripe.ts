import { fetcher } from '@reapit/elements'
import { genPaymentsHeaders } from '../utils/headers'

export interface StripeOAuthLinkResponse {
  url: string | Location
}

export interface StripePublicKeyResponse {
  publicKey: string
}

export interface StripePaymentIntentResponse {
  client_secret: string
}

export interface StripePaymentIntentRequest {
  amount: number
  currency: string
  transfer_data: {
    destination: string
  }
}

export const getStripeOauthLink = async (customerCode: string, userName: string) => {
  try {
    const link: StripeOAuthLinkResponse | undefined = await fetcher({
      url: `/stripe-oauth-link/${customerCode}/?userName=${userName}`,
      api: window.reapit.config.paymentsApiUrl,
      method: 'GET',
      headers: await genPaymentsHeaders(),
    })

    if (link) {
      return (window.location = link.url as Location)
    }

    throw new Error(`Link not found for ${customerCode}`)
  } catch (err) {
    console.error(err)
  }
}

export const onBoardStripeUser = async () => {
  try {
    const link: StripeOAuthLinkResponse | undefined = await fetcher({
      url: `/stripe-onboard-user`,
      api: window.reapit.config.paymentsApiUrl,
      method: 'GET',
      headers: await genPaymentsHeaders(),
    })

    if (link) {
      return (window.location = link.url as Location)
    }

    throw new Error(`User onboarding failed ${link}`)
  } catch (err) {
    console.error(err)
  }
}

export const createStripePaymentIntent = async (
  options: StripePaymentIntentRequest
) => {
  try {
    const paymentIntent:
      | StripePaymentIntentResponse
      | undefined = await fetcher({
      url: `/stripe-payment-intent`,
      api: window.reapit.config.paymentsApiUrl,
      method: 'POST',
      headers: await genPaymentsHeaders(),
      body: options,
    })

    if (paymentIntent) {
      return paymentIntent.client_secret
    }

    throw new Error(`Payment intent failed ${paymentIntent}`)
  } catch (err) {
    console.error(err)
  }
}

export const getStripePublicKey = async () => {
  try {
    const publicKey: StripePublicKeyResponse | undefined = await fetcher({
      url: `/stripe-public-key`,
      api: window.reapit.config.paymentsApiUrl,
      method: 'GET',
      headers: await genPaymentsHeaders(),
    })

    if (publicKey) {
      return publicKey.publicKey
    }

    throw new Error(`Fetch public key failed ${publicKey}`)
  } catch (err) {
    console.error(err)
  }
}
