import { INVALID_BACKGROUND_AS_BASE64 } from '../../../common/utils/constants'

export const handleImageError = (source: any) => {
  source.src = INVALID_BACKGROUND_AS_BASE64
  source.target.src = INVALID_BACKGROUND_AS_BASE64
  source.onerror = ''
  return true
}
