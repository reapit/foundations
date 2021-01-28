import { fetcher } from '@reapit/elements'
import { genPlatformHeaders } from './headers'

export const platformFetcher = async (path: string) =>
  fetcher({
    api: window.reapit.config.platformApiUrl,
    url: path,
    method: 'GET',
    headers: await genPlatformHeaders(),
  })
