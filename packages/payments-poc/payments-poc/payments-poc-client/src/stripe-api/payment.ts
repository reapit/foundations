import { API_BASE } from '../constants/api'

export const createPaymentIntent = (options) => {
  return window
    .fetch(`${API_BASE[window.reapit.config.appEnv]}/create-payment-intent`, {
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
    .fetch(`${API_BASE[window.reapit.config.appEnv]}/product-details`, {
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
    .fetch(`${API_BASE[window.reapit.config.appEnv]}/public-key`, {
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

