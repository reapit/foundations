import { logger, StringMap } from '@reapit/utils-react'
import { genPlatformHeaders } from './headers'

export const fetcher = async (path: string) =>
  fetch(`${process.env.platformApiUrl}${path}`, {
    headers: (await genPlatformHeaders()) as StringMap,
  })
    .then((res) => res.json())
    .catch((error) => logger(error))

export const fetcherWithClientCode = (clientCode: string) => async (path: string) =>
  fetch(`${process.env.platformApiUrl}${path}`, {
    headers: {
      ...((await genPlatformHeaders()) as StringMap),
      ['reapit-customer']: clientCode,
    },
  })
    .then((res) => res.json())
    .catch((error) => logger(error))
