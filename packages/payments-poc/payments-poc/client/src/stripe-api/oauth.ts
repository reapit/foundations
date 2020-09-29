import { ReapitConnectSession } from '@reapit/connect-session'

export const getOauthLink = async (customerId: string,) => {
  await fetch(`${window.reapit.config.paymentsApiUrl}/get-oauth-link?customerId=${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.url) {
        window.location = data.url
      }
    })
}


export const accountIdService = async (
  customerId: string,
  session: ReapitConnectSession
): Promise<{accountId: string} | undefined> => {
  return await fetch(`${window.reapit.config.paymentsApiUrl}/get-account-id?customerId=${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session.idToken
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data',data)
      return data.account
    })
}
