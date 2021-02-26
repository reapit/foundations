import { StringMap } from '@reapit/elements'
import { logger } from '@reapit/utils'
import { genPlatformHeaders } from './headers'

export const fetcher = async (path: string) =>
  fetch(`${window.reapit.config.platformApiUrl}${path}`, {
    headers: (await genPlatformHeaders()) as StringMap,
  })
    .then((res) => res.json())
    .catch((error) => logger(error))
