import axios from 'axios'
import { API_VERSION } from '@/constants/api'

export const createPlatformAxiosInstance = () => {
  return axios.create({
    baseURL: process.env.PLATFORM_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    },
  })
}
