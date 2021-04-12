import { getClientHeaders } from './get-client-headers'

export interface FetcherParams<T> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: { [key: string]: string }
  body?: T
}

export const fetcher = async <T, B>({
  url,
  body,
  method = 'GET',
  headers = getClientHeaders({}),
}: FetcherParams<B>): Promise<T | undefined> => {
  try {
    const res = await fetch(url, {
      headers,
      method,
      body: JSON.stringify(body),
    } as RequestInit)

    const jsonRes = await res.json()

    if (res.ok) {
      return jsonRes as T
    }

    throw new Error(`${res.status} ${method} ${url} ${jsonRes}`)
  } catch (err) {
    console.error(err.message)
  }
}
