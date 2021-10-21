import { logger, StringMap } from '@reapit/utils-react'
import { genPlatformHeaders } from './headers'

export const fetcher = async (path: string) =>
  fetch(`${window.reapit.config.platformApiUrl}${path}`, {
    headers: (await genPlatformHeaders()) as StringMap,
  })
    .then((res) => res.json())
    .catch((error) => logger(error))

export const fetcherWithClientHeader = (clientId: string) => async (path: string) =>
  fetch(`${window.reapit.config.platformApiUrl}${path}`, {
    headers: {
      ...((await genPlatformHeaders()) as StringMap),
      ['reapit-customer']: clientId,
    },
  })
    .then((res) => res.json())
    .catch((error) => logger(error))
