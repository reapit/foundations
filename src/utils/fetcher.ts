import { REAPIT_API_BASE_URL } from '../constants/api'
import { FetcherParams } from '../types/core'
// When Cognito back end flow is finished
// import { getAccessToken } from '../utils/cognito'
// import { authLogout } from '../actions/auth'

export class FetchError extends Error {
  public name: string

  constructor(public message: string, public response?: any) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = (this.constructor as any).name
    this.message = message

    Error.captureStackTrace(this, this.constructor)
    this.response = response
  }
}

const fetcher = async <T, B>({ url, method, body, headers }: FetcherParams<B>): Promise<any | FetchError> => {
  const path = `${REAPIT_API_BASE_URL}${url}`
  // const accessToken = await getAccessToken()

  // if (!accessToken) {
  //   return store.dispatch(authLogout())
  // }

  const res = await fetch(path, {
    headers: {
      ...headers
      // ,
      // Authorization: accessToken
    },
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

  const error = new FetchError(`ERROR FETCHING ${method} ${path} ${JSON.stringify(res)}`)
  console.error(error.message)
  try {
    error.response = await res.json()
  } catch (err) {
    error.response = res
  }

  return Promise.reject(error)
}

export default fetcher
