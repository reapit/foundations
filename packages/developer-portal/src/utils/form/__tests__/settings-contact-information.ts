import { validate } from '../settings-contact-information'
import { ContactInformationValues } from '@/components/pages/settings/forms/contact-information-form'
import errorMessages from '@/constants/error-messages'

describe('ContactInformationValues validation', () => {
  it('validate invalid fullname', () => {
    const input: ContactInformationValues = {
      companyName: 'Reapit',
      name: '123&&&&',
      jobTitle: 'Developer',
      telephone: '0845 123 4512',
    }

    const validateRequiredKeys = ['name']

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_INVALID_NAME
    }
    expect(validate(input)).toEqual(output)
  })

  it('validate invalid telephone', () => {
    const input: ContactInformationValues = {
      companyName: 'Reapit',
      name: 'Levy',
      jobTitle: 'Developer',
      telephone: '0845 xxx yyy',
    }
    expect(validate(input)).toEqual({
      telephone: errorMessages.FIELD_PHONE_NUMER,
    })
  })
})
