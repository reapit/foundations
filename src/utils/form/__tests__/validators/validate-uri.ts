import errorMessages from '@/constants/error-messages'
import validateURI from '../../../validators/validate-uri'

interface ValueTypes {
  validURI: string
  invalidURI: string
}

type ErrorKeys = 'validURI' | 'invalidURI'

describe('Validate uri function', () => {
  it('work correctly', () => {
    const values = {
      validURI: 'http://website.com',
      invalidURI: 'invalid.net'
    }

    expect(
      validateURI<ValueTypes, ErrorKeys>({
        values,
        currentErrors: {},
        keys: ['invalidURI', 'validURI']
      })
    ).toStrictEqual({
      invalidURI: errorMessages.FIELD_WRONG_URI_FORMAT
    })
  })
})
