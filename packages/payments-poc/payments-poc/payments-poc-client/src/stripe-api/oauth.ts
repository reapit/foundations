import { API_BASE } from '../constants/api'

export const getOauthLink = async () => {
  await fetch(`${API_BASE[process.env.NODE_ENV || 'development']}/get-oauth-link`, {
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

