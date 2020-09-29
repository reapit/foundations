export const onBoardUser = async () => {
  await fetch(`${window.reapit.config.paymentsApiUrl}/onboard-user`, {
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
