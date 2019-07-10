import { REAPIT_API_BASE_URL } from '../constants/api'
import { FetcherParams } from '../types/core'
import Store from '../core/store'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

const fetcher = async <T, B>({ url, method, body, headers }: FetcherParams<B>) => {
  const path = `${REAPIT_API_BASE_URL}${url}`

  try {
    const res = await fetch(path, {
      headers,
      method,
      body: JSON.stringify(body)
    } as RequestInit)

    if (res.status < 400) {
      try {
        const jsonVal = await res.json()
        return jsonVal as T
      } catch (err) {
        return res.ok
      }
    }
    throw new Error(`ERROR FETCHING ${method} ${path} ${JSON.stringify(res)}`)
  } catch (error) {
    Store.dispatch(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
    console.error('API ERROR: ', JSON.stringify(error.message))
  }
}

export default fetcher
