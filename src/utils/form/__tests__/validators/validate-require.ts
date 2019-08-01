import errorMessages from '@/constants/error-messages'
import validateRequire from '../../../validators/validate-require'

interface ValueTypes {
  valid: string
  invalid: string
}

type ErrorKeys = 'valid' | 'invalid'

describe('Validate require function', () => {
  it('work correctly', () => {
    const values = {
      valid: 'test@mail.com',
      invalid: ''
    }

    expect(
      validateRequire<ValueTypes, ErrorKeys>({
        values,
        currentErrors: {},
        keys: ['invalid', 'valid']
      })
    ).toStrictEqual({
      invalid: errorMessages.FIELD_REQUIRED
    })
  })
})
