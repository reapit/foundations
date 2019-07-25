import errorMessages from '@/constants/error-messages'
import { validateMaxCharacterLength, validateMinCharacterLength } from '@/utils/validators'

interface ValueTypes {
  validInput: string
  invalidInput: string
}

type ErrorKeys = 'validInput' | 'invalidInput'

describe('Validate character length functions', () => {
  it('validateMinCharacterLength should work correctly', () => {
    const values = {
      validInput: 'lorem ipsum',
      invalidInput: 'sorem'
    }

    expect(
      validateMinCharacterLength<ValueTypes, ErrorKeys>({
        values,
        currentErrors: {},
        keys: ['validInput', 'invalidInput'],
        length: 6
      })
    ).toStrictEqual({
      invalidInput: errorMessages.MINIMUM_CHARACTER_LENGTH(6)
    })
  })

  it('validateMaxCharacterLength should work correctly', () => {
    const values = {
      validInput: 'sorem',
      invalidInput: 'lorem ipsum'
    }

    expect(
      validateMaxCharacterLength<ValueTypes, ErrorKeys>({
        values,
        currentErrors: {},
        keys: ['validInput', 'invalidInput'],
        length: 5
      })
    ).toStrictEqual({
      invalidInput: errorMessages.MAXIMUM_CHARACTER_LENGTH(5)
    })
  })
})
