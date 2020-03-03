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

    const output = {} as any
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }
    output.description = 'Must be between 150 and 1000 characters'
    output.summary = 'Must be between 50 and 150 characters'

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
      launchUri: 'http://localhost:8000',
      iconImageUrl: 'test',
      homePage: 'http://localhost:8000',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
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
      launchUri: 'http://localhost:8000',
      iconImageUrl: 'test',
      homePage: 'http://localhost:8000',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
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
      launchUri: 'http://localhost:8000',
      iconImageUrl: 'test',
      homePage: 'http://localhost:8000',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: ['scope1'],
      redirectUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'app2:/invalid',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({
      signoutUris: 'Invalid sign out uri(s)',
    })
  })

  it('validate home page field ', () => {
    const input: CustomCreateAppModel = {
      screen4ImageUrl: 'test',
      screen3ImageUrl: 'test',
      screen2ImageUrl: 'test',
      screen1ImageUrl: 'test',
      name: 'test',
      telephone: 'test',
      supportEmail: 'tester@gmail.com',
      launchUri: 'http://localhost:8000',
      iconImageUrl: 'test',
      homePage: 'test',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: [],
      redirectUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({
      homePage: 'Invalid Home Page URL',
    })
  })

  it('validate launch uri field ', () => {
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
      homePage: 'http://localhost:8000',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: [],
      redirectUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      signoutUris: 'https://google.com,https://twitter.com,http://localhost:8080',
      authFlow: 'authorisationCode',
    }

    expect(validate(input)).toEqual({
      launchUri: 'Invalid Launch URI',
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
      launchUri: 'http://localhost:8000',
      iconImageUrl: 'test',
      homePage: 'http://localhost:8000',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
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
      launchUri: 'http://localhost:8000',
      iconImageUrl: 'test',
      homePage: 'http://localhost:8000',
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: ['scope1'],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({
      redirectUris: 'Invalid redirect uri(s)',
      signoutUris: 'Invalid sign out uri(s)',
    })
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
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: ['scope1', 'scope2'],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({
      homePage: 'Invalid Home Page URL',
      launchUri: 'Invalid Launch URI',
      redirectUris: 'Invalid redirect uri(s)',
      signoutUris: 'Invalid sign out uri(s)',
    })
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
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: [],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({
      homePage: 'Invalid Home Page URL',
      launchUri: 'Invalid Launch URI',
      redirectUris: 'Invalid redirect uri(s)',
      scopes: 'At least one Permission is required',
      signoutUris: 'Invalid sign out uri(s)',
    })
  })

  it('should run correctly with invalid description', () => {
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
      // eslint-disable-next-line
      description: '123',
      summary: 'Amazon.com, Inc., is an American multinational technology company based in Seattle',
      scopes: ['scope1', 'scope2'],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({
      description: 'Must be between 150 and 1000 characters',
      homePage: 'Invalid Home Page URL',
      launchUri: 'Invalid Launch URI',
      redirectUris: 'Invalid redirect uri(s)',
      signoutUris: 'Invalid sign out uri(s)',
    })
  })

  it('should run correctly with invalid summary', () => {
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
      description:
        // eslint-disable-next-line
        'Amazon.com, Inc., is an American multinational technology company based in Seattle that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence. It is considered one of the Big Four tech companies, along with Google, Apple, and Facebook.',
      summary: '123',
      scopes: ['scope1', 'scope2'],
      redirectUris: 'not valid',
      signoutUris: 'not valid',
      authFlow: 'clientCredentials',
    }

    expect(validate(input)).toEqual({
      homePage: 'Invalid Home Page URL',
      launchUri: 'Invalid Launch URI',
      redirectUris: 'Invalid redirect uri(s)',
      signoutUris: 'Invalid sign out uri(s)',
      summary: 'Must be between 50 and 150 characters',
    })
  })
})
