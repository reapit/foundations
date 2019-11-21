import { validate } from '../submit-revision'
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'

import errorMessages from '@/constants/error-messages'

describe('submitRevisionValidation', () => {
  it('validate required fields', () => {
    const input: CreateAppRevisionModel = {
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageUrl: '',
      homePage: '',
      description: '',
      summary: '',
      isListed: false,
      screen1ImageUrl: '',
      screen2ImageUrl: '',
      screen3ImageUrl: '',
      screen4ImageUrl: ''
    }

    const validateRequiredKeys = [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageUrl',
      'homePage',
      'description',
      'summary',
      'screen1ImageUrl'
    ]

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }
    expect(validate(input)).toEqual(output)
  })

  it('validate wrong email format and character length', () => {
    const input: CreateAppRevisionModel = {
      name: 'john doe',
      telephone: '999999999',
      supportEmail: 'invalid--reapit.com',
      launchUri: 'httpf://reapit@com',
      homePage: 'http://reapitcom',
      description: 'Lorem ipsum dolor sit amet.',
      summary: '...'
    }
    expect(validate(input)).toEqual({
      supportEmail: errorMessages.FIELD_WRONG_EMAIL_FORMAT,
      launchUri: errorMessages.FIELD_WRONG_URI_FORMAT,
      homePage: errorMessages.FIELD_WRONG_URI_FORMAT,
      description: errorMessages.MINIMUM_CHARACTER_LENGTH(150),
      summary: errorMessages.MINIMUM_CHARACTER_LENGTH(50)
    })
  })

  it('validate maximum character length', () => {
    const gt150CharString =
      'Pellentesque quis scelerisque ex. Fusce pharetra sapien eu odio hendrerit bibendum. Nullam pellentesque vel tellus eu dictum. Cras eu sapien vitae elit vestibulum porta. Phasellus sagittis est eget vestibulum pellentesque. Integer ut finibus turpis. Vestibulum sodales placerat mauris, nec bibendum justo scelerisque in. Suspendisse sodales maximus arcu, nec ultricies ex commodo et.'
    const input: CreateAppRevisionModel = {
      name: 'john doe',
      telephone: '999999999',
      supportEmail: 'valid@reapit.com',
      launchUri: 'http://reapit.com',
      homePage: 'https://reapit.com',
      description: gt150CharString,
      summary: gt150CharString
    }
    expect(validate(input)).toEqual({
      summary: errorMessages.MAXIMUM_CHARACTER_LENGTH(150)
    })
  })

  it('return empty object it everything is valid', () => {
    const input: CreateAppRevisionModel = {
      name: 'john doe',
      telephone: '999999999',
      supportEmail: 'valid@reapit.com',
      launchUri: 'http://reapit.com',
      homePage: 'http://reapit.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque blandit est, et laoreet sapien congue vitae. Nulla lacus nulla, interdum quis bibendum in, consequat gravida quam.',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque blandit est.',
      screen1ImageUrl: 'base64 string...'
    }

    expect(validate(input)).toEqual({})
  })
})
