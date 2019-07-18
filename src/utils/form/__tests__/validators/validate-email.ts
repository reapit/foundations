import { validateEmail } from '@/utils/validators'
import errorMessages from '@/constants/error-messages'

interface ValueTypes {
  validEmail: string
  invalidEmail: string
}

type ErrorKeys = 'validEmail' | 'invalidEmail'

describe('Validate email function', () => {
  it('work correctly', () => {
    const values = {
      validEmail: 'test@mail.com',
      invalidEmail: 'test'
    }

    expect(
      validateEmail<ValueTypes, ErrorKeys>({
        values,
        currentErrors: {},
        keys: ['invalidEmail', 'validEmail']
      })
    ).toStrictEqual({
      invalidEmail: errorMessages.FIELD_WRONG_EMAIL_FORMAT
    })
  })

  it('should not override existed error key', () => {
    const values = {
      validEmail: 'test@mail.com',
      invalidEmail: 'test'
    }

    expect(
      validateEmail<ValueTypes, ErrorKeys>({
        values,
        currentErrors: { invalidEmail: 'test' },
        keys: ['invalidEmail', 'validEmail']
      })
    ).toStrictEqual({
      invalidEmail: 'test'
    })
  })
})
