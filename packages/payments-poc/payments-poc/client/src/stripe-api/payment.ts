export const createPaymentIntent = (options) => {
  return window
    .fetch(`${window.reapit.config.paymentsApiUrl}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return null
      }
    })
    .then((data) => {
      if (!data || data.error) {
        console.log('API error:', { data })
        throw new Error('PaymentIntent API Error')
      } else {
        return data.client_secret
      }
    })
}

export const getProductDetails = (options) => {
  return window
    .fetch(`${window.reapit.config.paymentsApiUrl}/product-details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return null
      }
    })
    .then((data) => {
      if (!data || data.error) {
        console.log('API error:', { data })
        throw Error('API Error')
      } else {
        return data
      }
    })
}

export const getPublicStripeKey = (options) => {
  return window
    .fetch(`${window.reapit.config.paymentsApiUrl}/public-key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return null
      }
    })
    .then((data) => {
      if (!data || data.error) {
        console.log('API error:', { data })
        throw Error('API Error')
      } else {
        return data.publicKey
      }
    })
}

