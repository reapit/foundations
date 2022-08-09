// workaround cos node-fetch is a cjs module
export const fetch = (url: RequestInfo, init?: RequestInit | undefined) =>
  import('node-fetch').then(({ default: fetch }) => fetch(url as any, init as any))
