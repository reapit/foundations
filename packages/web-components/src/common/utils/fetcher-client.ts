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
  headers = getClientHeaders(),
}: FetcherParams<B>): Promise<T | undefined> => {
  try {
    const res = await fetch(url, {
      headers,
      method,
      body: JSON.stringify(body),
    } as RequestInit)

    if (res.ok) {
      try {
        const jsonVal = await res.json()
        return jsonVal as T
      } catch (err) {
        return {} as T
      }
    }

    throw new Error(`${res.status} ${method} ${url} ${res.statusText}`)
  } catch (err) {
    console.error(err.message)
  }
}
