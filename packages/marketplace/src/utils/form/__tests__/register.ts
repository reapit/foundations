import { registerValidate, RegisterFormError, trimValues } from '../register'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import ErrorMessages from '@/constants/error-messages'

type InputOutput = [CreateDeveloperModel, RegisterFormError]

const invalidValues: InputOutput[] = [
  [
    { name: '', companyName: '', email: '', telephone: '', agreedTerms: '' },
    {
      name: ErrorMessages.FIELD_REQUIRED,
      companyName: ErrorMessages.FIELD_REQUIRED,
      email: ErrorMessages.FIELD_REQUIRED,
      telephone: ErrorMessages.FIELD_REQUIRED,
    },
  ],
  [
    { name: '   ', companyName: '', email: '', telephone: '', agreedTerms: '' },
    {
      name: ErrorMessages.FIELD_REQUIRED,
      companyName: ErrorMessages.FIELD_REQUIRED,
      email: ErrorMessages.FIELD_REQUIRED,
      telephone: ErrorMessages.FIELD_REQUIRED,
    },
  ],
  [
    {
      name: 'John Doe',
      companyName: 'Acme',
      email: '',
      telephone: '',
      agreedTerms: '',
    },
    {
      email: ErrorMessages.FIELD_REQUIRED,
      telephone: ErrorMessages.FIELD_REQUIRED,
    },
  ],
  [
    {
      name: '',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678',
      agreedTerms: '',
    },
    {
      name: ErrorMessages.FIELD_REQUIRED,
      email: ErrorMessages.FIELD_WRONG_EMAIL_FORMAT,
    },
  ],
  [
    {
      name: 'Jame$$',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678',
      agreedTerms: '123',
    },
    {
      name: ErrorMessages.FIELD_INVALID_NAME,
      email: ErrorMessages.FIELD_WRONG_EMAIL_FORMAT,
    },
  ],
  [
    {
      name: 'Jame$$',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: 'abc',
      agreedTerms: '123',
    },
    {
      name: ErrorMessages.FIELD_INVALID_NAME,
      email: ErrorMessages.FIELD_WRONG_EMAIL_FORMAT,
      telephone: ErrorMessages.FIELD_PHONE_NUMER,
    },
  ],
  [
    {
      name: 'Jame',
      companyName: 'Doe',
      email: 'valid@company.com',
      telephone: '12345678',
      agreedTerms: '123',
    },
    {},
  ],
]

const validValues: CreateDeveloperModel[] = [
  {
    name: 'Alice',
    companyName: 'Doe',
    email: 'alice_doe@gmail.com',
    telephone: '12345678',
    agreedTerms: '123',
  },
  {
    name: 'xxxxxxxx',
    companyName: 'yyyyy',
    email: 'xxxyyyy@company.org',
    telephone: '12345678',
    agreedTerms: '123',
  },
]

describe('registerValidation', () => {
  it('invalid values', () => {
    invalidValues.forEach(([input, output]) => {
      expect(registerValidate(input)).toEqual(output)
    })
  })

  it('valid values', () => {
    validValues.forEach(input => {
      expect(registerValidate(input)).toEqual({})
    })
  })
})

describe('trimValues', () => {
  it('should run correctly', () => {
    const testValue = ' test '
    const expectedValue = 'test'
    expect(
      trimValues({
        agreedTerms: testValue,
        telephone: testValue,
        name: testValue,
        jobTitle: testValue,
        email: testValue,
        companyName: testValue,
      }),
    ).toEqual({
      agreedTerms: expectedValue,
      telephone: expectedValue,
      name: expectedValue,
      jobTitle: expectedValue,
      email: expectedValue,
      companyName: expectedValue,
    })
  })
})
