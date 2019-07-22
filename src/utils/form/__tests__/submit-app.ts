import { validate, SubmitAppFormErrorKeys } from '../submit-app'
import { CreateAppModel } from '@/types/marketplace-api-schema'

import errorMessages from '@/constants/error-messages'

describe('submitAppValidation', () => {
  it('validate require all field', () => {
    const input: CreateAppModel = {
      screen4ImageData: '',
      screen3ImageData: '',
      screen2ImageData: '',
      screen1ImageData: '',
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageData: '',
      homePage: '',
      description: '',
      summary: ''
    }

    const validateRequiredKeys = [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageData',
      'homePage',
      'description',
      'screen1ImageData',
      'summary'
    ]

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }

    expect(validate(input)).toEqual(output)
  })

  it('validate email field support email', () => {
    const input: CreateAppModel = {
      screen4ImageData: 'test',
      screen3ImageData: 'test',
      screen2ImageData: 'test',
      screen1ImageData: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'invalid email',
      launchUri: 'test',
      iconImageData: 'test',
      homePage: 'test',
      description: 'test',
      summary: 'test'
    }

    expect(validate(input)).toEqual({
      supportEmail: errorMessages.FIELD_WRONG_EMAIL_FORMAT
    })
  })

  it('return empty object it everything is valid', () => {
    const input: CreateAppModel = {
      screen4ImageData: 'test',
      screen3ImageData: 'test',
      screen2ImageData: 'test',
      screen1ImageData: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'test@test.com',
      launchUri: 'test',
      iconImageData: 'test',
      homePage: 'test',
      description: 'test',
      summary: 'test'
    }

    expect(validate(input)).toEqual({})
  })
})
