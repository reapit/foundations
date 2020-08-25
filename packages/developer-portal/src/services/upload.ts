import { fetcher, isBase64 } from '@reapit/elements'
import { generateHeader } from './utils'

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
    url: '/',
    api: window.reapit.config.uploadApiUrl,
    method: 'POST',
    headers: await generateHeader(window.reapit.config.marketplaceApiKey),
    body: object,
  })
}
