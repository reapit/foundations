// workaround cos node-fetch is a cjs module

// eslint-disable-next-line no-new-func
const importDynamic = new Function('modulePath', 'return import(modulePath)')

export const fetch = async (url: RequestInfo, init?: RequestInit | undefined) => {
  const module = await importDynamic('node-fetch')
  return module.default(url, init)
}
