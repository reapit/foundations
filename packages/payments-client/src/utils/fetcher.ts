import { StringMap } from '@reapit/elements'
import { genPlatformHeaders } from '../utils/headers'

export const fetcher = async (path: string) =>
  fetch(`${window.reapit.config.platformApiUrl}${path}`, {
    headers: (await genPlatformHeaders()) as StringMap,
  }).then(res => res.json())

export const localFetcher = async (path: string, session: string) =>
  fetch(`http://localhost:3000/local${path}`, {
    headers: {
      'reapit-customer': 'SBOX',
      'x-api-key': session,
      'api-version': '2020-01-31',
    },
  }).then(res => res.json())
