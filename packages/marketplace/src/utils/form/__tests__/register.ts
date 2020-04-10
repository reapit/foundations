import { registerValidate, RegisterFormError } from '../register'
import { RegisterFormValues } from '@/components/pages/register'

type InputOutput = [RegisterFormValues, RegisterFormError]

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
      name: '',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678',
      agreedTerms: '123',
    },
    {
      name: 'Required',
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

const validValues: RegisterFormValues[] = [
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
