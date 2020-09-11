import { API_BASE } from '../constants/api'

export const onBoardUser = async () => {
  await fetch(`${API_BASE[window.reapit.config.appEnv]}/onboard-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.url) {
        window.location = data.url
      } else {
        console.log('data', data)
      }
    })
}
