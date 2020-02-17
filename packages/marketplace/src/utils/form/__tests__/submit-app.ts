import errorMessages from '@/constants/error-messages'
import { CustomCreateAppModel } from '@/components/pages/developer-submit-app'
import { validate } from '../submit-app'

describe('submitAppValidation', () => {
  it('validate require all field', () => {
    const input: CustomCreateAppModel = {
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
      scopes: ['scope1'],
      redirectUris: '',
      signoutUris: '',
      authFlow: '',
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
      'summary',
      'redirectUris',
      'signoutUris',
      'authFlow',
    ]

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }

    expect(validate(input)).toEqual(output)
  })

  it('validate email field support email', () => {
    const input: CustomCreateAppModel = {
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
      scopes: ['scope1'],
      redirectUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'http://localhost:8080',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({
      supportEmail: errorMessages.FIELD_WRONG_EMAIL_FORMAT,
    })
  })

  it('validate redirect uri(s) field ', () => {
    const input: CustomCreateAppModel = {
      screen4ImageUrl: 'test',
      screen3ImageUrl: 'test',
      screen2ImageUrl: 'test',
      screen1ImageUrl: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'tester@gmail.com',
      launchUri: 'test',
      iconImageUrl: 'test',
      homePage: 'test',
      description: 'test',
      summary: 'test',
      scopes: ['scope1'],
      redirectUris: 'http://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'http://localhost:8080',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({
      redirectUris: 'Invalid redirect uri(s)',
    })
  })

  it('validate sign out uri(s) field ', () => {
    const input: CustomCreateAppModel = {
      screen4ImageUrl: 'test',
      screen3ImageUrl: 'test',
      screen2ImageUrl: 'test',
      screen1ImageUrl: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'tester@gmail.com',
      launchUri: 'test',
      iconImageUrl: 'test',
      homePage: 'test',
      description: 'test',
      summary: 'test',
      scopes: ['scope1'],
      redirectUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'https://localhost:8080',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({
      signoutUris: 'Invalid sign out uri(s)',
    })
  })

  it('return empty object it everything is valid', () => {
    const input: CustomCreateAppModel = {
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
      scopes: ['scope1'],
      redirectUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'http://localhost:8080',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({})
  })

  it('dont validate signoutUris & redirectUris if authFlow = clientCredentials', () => {
    const input: CustomCreateAppModel = {
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
      scopes: ['scope1'],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({})
  })
  it('should validate scopes if authFlow = clientCredentials', () => {
    const input: CustomCreateAppModel = {
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
      scopes: ['scope1', 'scope2'],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({})
  })
  it('should run correctly with invalid scopes if authFlow = clientCredentials', () => {
    const input: CustomCreateAppModel = {
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
      scopes: [],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({ scopes: 'At least one Permission is required' })
  })
})
