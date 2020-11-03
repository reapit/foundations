import { fetcher, isBase64 } from '@reapit/elements'
import { URLS } from './constants'
import { generateHeaders } from './utils'

export type ImageUploaderReq = {
  name?: string
  imageData?: string
}

export type ImageUploaderRes = {
  Url?: string
}

export const imageUploaderHelper = async (object: ImageUploaderReq) => {
  const { imageData, name } = object

  if (!imageData || !name || !isBase64(imageData)) {
    return null
  }

  return fetcher({
    url: URLS.fileUpload,
    api: window.reapit.config.platformApiUrl,
    method: 'POST',
    headers: await generateHeaders(),
    body: object,
  })
}
