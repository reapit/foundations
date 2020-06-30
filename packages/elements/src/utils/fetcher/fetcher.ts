import { FetcherParams } from '../../types/core'

export class FetchError extends Error {
  public name: string
  public status: number

  constructor(public message: string, public response?: Response) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = (this.constructor as any).name
    this.status = (this.constructor as any).status
    this.message = message

    Error.captureStackTrace(this, this.constructor)
    this.response = response
  }
}

/**
 * allow fetch from raw url string (instead of api - base domal, url - path)
 */
export const fetcherWithRawUrl = async <T, B>({
  url,
  method,
  body,
  headers,
}: Omit<FetcherParams<B>, 'api'>): Promise<any | FetchError> => {
  const res = await fetch(url, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    return res.json()
  }

  const error = new FetchError(`ERROR FETCHING ${method} ${url} ${JSON.stringify(res)}`, res)
  console.error(error.message)
  try {
    error.response = await res.json()
  } catch (err) {
    error.response = res
  }
  throw error
}

/**
 * return headers of responose
 */
export const fetcherWithReturnHeader = async <T, B>({
  api,
  url,
  method,
  body,
  headers,
}: FetcherParams<B>): Promise<Headers | FetchError> => {
  const path = `${api}${url}`

  const res = await fetch(path, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    return res.headers
  }

  const error = new FetchError(`ERROR FETCHING ${method} ${path} ${JSON.stringify(res)}`, res)
  console.error(error.message)
  try {
    error.response = await res.json()
  } catch (err) {
    error.response = res
  }
  throw error
}

export const fetcherWithBlob = async <T, B>({
  api,
  url,
  method,
  body,
  headers,
}: FetcherParams<B>): Promise<Blob | FetchError> => {
  const path = `${api}${url}`

  const res = await fetch(path, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    try {
      const blob = await res.blob()
      return blob
    } catch (err) {
      const error = new FetchError("Can't convert response to blob. Error:", err.message)
      console.error(error.message)
      throw error
    }
  }

  const error = new FetchError(`ERROR FETCHING ${method} ${path} ${JSON.stringify(res)}`, res)
  console.error(error.message)
  try {
    error.response = await res.json()
  } catch (err) {
    error.response = res
  }
  throw error
}

export const fetcher = async <T, B>({
  api,
  url,
  method,
  body,
  headers,
}: FetcherParams<B>): Promise<any | FetchError> => {
  const path = `${api}${url}`

  const res = await fetch(path, {
    headers,
    method,
    body: JSON.stringify(body),
  } as RequestInit)

  if (res.status < 400) {
    try {
      const jsonVal = await res.json()
      return jsonVal as T
    } catch (err) {
      return res.ok
    }
  }

  const error = new FetchError(`ERROR FETCHING ${method} ${path} ${JSON.stringify(res)}`, res)
  console.error(error.message)
  try {
    error.response = await res.json()
  } catch (err) {
    error.response = res
  }
  return Promise.reject(error)
}
