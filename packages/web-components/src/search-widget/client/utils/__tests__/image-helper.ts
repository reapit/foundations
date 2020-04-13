import { handleImageError } from '../image-helpers'
import { INVALID_BACKGROUND_AS_BASE64 } from '../../../../common/utils/constants'

describe('image-helpers', () => {
  it('handleImageError', () => {
    const errorEvent = { src: '', onerror: jest.fn(), target: { src: '' } }
    handleImageError(errorEvent)
    expect(errorEvent.src).toEqual(INVALID_BACKGROUND_AS_BASE64)
    expect(errorEvent.onerror).toEqual('')
  })
})
