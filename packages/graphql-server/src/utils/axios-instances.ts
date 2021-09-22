import axios, { AxiosRequestConfig } from 'axios'
import axiosRetry from 'axios-retry'

import { API_VERSION } from '../constants/api'

const retryConfig: AxiosRequestConfig['axios-retry'] = {
  retries: 10,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.response && error.response.status === 429
  },
}

export const createPlatformAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.PLATFORM_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    },
  })
  axiosRetry(instance, retryConfig)
  return instance
}
