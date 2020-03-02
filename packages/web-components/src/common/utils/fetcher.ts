export interface FetcherParams<T> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: { [key: string]: string }
  body?: T
}

export const defaultHeaders = {
  'api-version': '2020-02-18',
  'Content-Type': 'application/json',
  'x-api-key': '',
}

export const fetcher = async <T, B>({
  url,
  body,
  method = 'GET',
  headers = defaultHeaders,
}: FetcherParams<B>): Promise<T | boolean | undefined> => {
  const path = `${process.env.PLATFORM_API_BASE_URL}${url}`

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
