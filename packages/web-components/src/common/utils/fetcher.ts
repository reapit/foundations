export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  api: string
  url: string
  headers: { [key: string]: string }
  body?: T
}

export const defaultHeaders = {
  'api-version': '2020-02-18',
  'Content-Type': 'application/json',
}

export const fetcher = async <T, B>({
  api,
  url,
  method,
  body,
  headers = defaultHeaders,
}: FetcherParams<B>): Promise<T | boolean | undefined> => {
  const path = `${api}${url}`

  try {
    const res = await fetch(path, {
      headers,
      method,
      body: JSON.stringify(body),
    } as RequestInit)

    if (res.ok) {
      try {
        const jsonVal = await res.json()
        return jsonVal as T
      } catch (err) {
        return res.ok
      }
    }

    throw new Error(`${method} ${path} ${JSON.stringify(res)}`)
  } catch (err) {
    console.error(`ERROR FETCHING ${err.message}`)
  }
}
