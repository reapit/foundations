import { registerValidate, RegisterFormError, trimValues } from '../register'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'

type InputOutput = [CreateDeveloperModel, RegisterFormError]

const invalidValues: InputOutput[] = [
  [
    { name: '', companyName: '', email: '', telephone: '', agreedTerms: '' },
    {
      name: 'Required',
      companyName: 'Required',
      email: 'Required',
      telephone: 'Required',
    },
  ],
  [
    { name: '   ', companyName: '', email: '', telephone: '', agreedTerms: '' },
    {
      name: 'Required',
      companyName: 'Required',
      email: 'Required',
      telephone: 'Required',
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
      email: 'Required',
      telephone: 'Required',
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
      name: 'Required',
      email: 'Invalid email address',
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
      name: 'Invalid full name',
      email: 'Invalid email address',
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
