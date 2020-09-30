import { ReapitConnectSession } from '@reapit/connect-session'

export const getOauthLink = async (customerCode: string, session: ReapitConnectSession) => {
  await fetch(`${window.reapit.config.paymentsApiUrl}/stripe-oauth-link/${customerCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: session.idToken
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.url) {
        window.location = data.url
      }
    })
}


export const accountService = async (
  customerCode: string,
  session: ReapitConnectSession
): Promise<{accountId: string} | undefined> => {
  return await fetch(`${window.reapit.config.paymentsApiUrl}/account/${customerCode}`, {
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
