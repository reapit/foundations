import { StringMap } from '@reapit/elements'
import { genPlatformHeaders } from '../utils/headers'

export const fetcher = async (path: string) =>
  fetch(`${window.reapit.config.platformApiUrl}${path}`, {
    headers: (await genPlatformHeaders()) as StringMap,
  }).then(res => res.json())
