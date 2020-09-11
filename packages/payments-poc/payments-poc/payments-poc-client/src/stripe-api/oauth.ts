import { API_BASE } from '../constants/api'

export const getOauthLink = async (customerId: string,) => {
  await fetch(`${API_BASE[window.reapit.config.appEnv]}/get-oauth-link?customerId=${customerId}`, {
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
): Promise<{accountId: string} | undefined> => {
  return await fetch(`${API_BASE[window.reapit.config.appEnv]}/get-account-id?customerId=${customerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('data',data)
      return data.account
    })
}
