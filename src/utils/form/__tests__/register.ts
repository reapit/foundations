import { registerValidate, RegisterFormError } from '../register'
import { RegisterFormValues } from '@/components/pages/register'

type InputOutput = [RegisterFormValues, RegisterFormError]

const invalidValues: InputOutput[] = [
  [
    { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
    { firstName: 'Required', lastName: 'Required', email: 'Required', password: 'Required' }
  ],
  [
    { firstName: 'John', lastName: 'Doe', email: '', password: '', confirmPassword: 'xxxxxx' },
    { email: 'Required', password: 'Required' }
  ],
  [
    {
      firstName: '',
      lastName: 'Doe John',
      email: 'invalid.com@.com',
      password: 'xxxxxx',
      confirmPassword: 'xxxxxx'
    },
    { firstName: 'Required', email: 'Invalid email address' }
  ],
  [
    {
      firstName: '',
      lastName: 'Doe John',
      email: 'invalid.com@.com',
      password: 'xxxxxx',
      confirmPassword: 'xxxxxx'
    },
    { firstName: 'Required', email: 'Invalid email address' }
  ],
  [
    {
      firstName: 'Jame',
      lastName: 'Doe',
      email: 'valid@company.com',
      password: 'xxxxxx',
      confirmPassword: 'xxxxxy'
    },
    { confirmPassword: 'Password does not match' }
  ]
]

const validValues: RegisterFormValues[] = [
  {
    firstName: 'Alice',
    lastName: 'Doe',
    email: 'alice_doe@gmail.com',
    password: '123456',
    confirmPassword: '123456'
  },
  {
    firstName: 'xxxxxxxx',
    lastName: 'yyyyy',
    email: 'xxxyyyy@company.org',
    password: 'a',
    confirmPassword: 'a'
  }
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
