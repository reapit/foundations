import { validate } from '../developer-edition-subscription'
import errorMessages from '@/constants/error-messages'
import { FormValues } from '@/components/ui/developer-edition-modal/form-fields'

describe('DeveloperEditionSubscription validation', () => {
  it('validate invalid developerList', () => {
    const input: FormValues = {
      developerList: [],
    }

    const validateRequiredKeys = ['developerList']

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }
    expect(validate(input)).toEqual(output)
  })
})
