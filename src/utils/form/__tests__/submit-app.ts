import { validate, CreateAppFormModel } from '../submit-app'

import errorMessages from '@/constants/error-messages'

describe('submitAppValidation', () => {
  it('validate require all field', () => {
    const input: CreateAppFormModel = {
      screen4ImageUrl: '',
      screen3ImageUrl: '',
      screen2ImageUrl: '',
      screen1ImageUrl: '',
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageUrl: '',
      homePage: '',
      description: '',
      summary: '',
      scopes: {}
    }

    const validateRequiredKeys = [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageUrl',
      'homePage',
      'description',
      'screen1ImageUrl',
      'summary'
    ]

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }

    expect(validate(input)).toEqual(output)
  })

  it('validate email field support email', () => {
    const input: CreateAppFormModel = {
      screen4ImageUrl: 'test',
      screen3ImageUrl: 'test',
      screen2ImageUrl: 'test',
      screen1ImageUrl: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'invalid email',
      launchUri: 'test',
      iconImageUrl: 'test',
      homePage: 'test',
      description: 'test',
      summary: 'test',
      scopes: {}
    }

    expect(validate(input)).toEqual({
      supportEmail: errorMessages.FIELD_WRONG_EMAIL_FORMAT
    })
  })

  it('return empty object it everything is valid', () => {
    const input: CreateAppFormModel = {
      screen4ImageUrl: 'test',
      screen3ImageUrl: 'test',
      screen2ImageUrl: 'test',
      screen1ImageUrl: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'test@test.com',
      launchUri: 'test',
      iconImageUrl: 'test',
      homePage: 'test',
      description: 'test',
      summary: 'test',
      scopes: {}
    }

    expect(validate(input)).toEqual({})
  })
})
