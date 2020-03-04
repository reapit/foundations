export interface FetcherParams<T> {
  url: string
  headers: { [key: string]: string }
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: T
}

export const fetcher = async <T, B>({
  url,
  body,
  method = 'GET',
  headers,
}: FetcherParams<B>): Promise<T | undefined> => {
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
}
