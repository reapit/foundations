import axios from 'axios'

import { API_VERSION } from './constants'

export const createPlatformAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.PLATFORM_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    },
  })
  return instance
}
