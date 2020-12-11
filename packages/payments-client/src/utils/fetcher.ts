import { StringMap } from '@reapit/elements'
import { genPlatformHeaders } from '../utils/headers'

export const fetcher = async (path: string) =>
  fetch(`https://platform.dev.paas.reapit.cloud${path}`, {
    headers: (await genPlatformHeaders()) as StringMap,
  }).then(res => res.json())
