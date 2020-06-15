import { isBase64 } from '@reapit/elements'

export const isValidUploadForm = (filename: string = '') => {
  if (filename.indexOf('base64') < 0) return true
  return isBase64(filename)
}
