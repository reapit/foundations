import { fetcher } from '@reapit/elements'
import { genPlatformHeaders } from '../utils/headers'

export const paymentFetcher = async (path: string) =>
  fetcher({
    api: window.reapit.config.platformApiUrl,
    url: path,
    method: 'GET',
    headers: await genPlatformHeaders(),
  })

export const localFetcher = async (path: string, session: string) =>
  fetcher({
    api: window.reapit.config.paymentApiUrl,
    url: path,
    method: 'GET',
    headers: {
      'reapit-customer': 'SBOX',
      'x-api-key': session,
      'api-version': '2020-01-31',
    },
  })
