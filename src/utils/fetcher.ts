import { API_CONSTANTS, BASE_URL } from '../constants/api'
import { FetcherParams } from '../types/core'

const fetcher = async <T, B>({ url, method, body }: FetcherParams<B>) => {
  const path = `${BASE_URL}${url}`

  try {
    const res = await fetch(path, {
      ...API_CONSTANTS,
      method,
      body
    } as RequestInit)

    if (res.status < 400) {
      const jsonVal = await res.json()
      return jsonVal as T
    }
    throw new Error(`ERROR FETCHING ${method} ${path} ${JSON.stringify(res)}`)
  } catch (error) {
    console.error('API ERROR: ', JSON.stringify(error.message))
  }
}

export default fetcher
