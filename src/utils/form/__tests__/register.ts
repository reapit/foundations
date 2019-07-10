import { registerValidate, RegisterFormError } from '../register'
import { RegisterFormValues } from '@/components/pages/register'

type InputOutput = [RegisterFormValues, RegisterFormError]

const invalidValues: InputOutput[] = [
  [
    { name: '', companyName: '', email: '', telephone: '' /* password: '', confirmPassword: '' */ },
    { name: 'Required', companyName: 'Required', email: 'Required', telephone: 'Required' /*  password: 'Required' */ }
  ],
  [
    { name: 'John Doe', companyName: 'Acme', email: '', telephone: '' /* password: '', confirmPassword: 'xxxxxx' */ },
    { email: 'Required', telephone: 'Required' /* password: 'Required' */ }
  ],
  [
    {
      name: '',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678'
      /* password: 'xxxxxx',
      confirmPassword: 'xxxxxx' */
    },
    { name: 'Required', email: 'Invalid email address' }
  ],
  [
    {
      name: '',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678'
      /* password: 'xxxxxx',
      confirmPassword: 'xxxxxx' */
    },
    { name: 'Required', email: 'Invalid email address' }
  ]
  /*  [
    {
      name: 'Jame',
      companyName: 'Doe',
      email: 'valid@company.com',
      telephone: '12345678'
      password: 'xxxxxx',
      confirmPassword: 'xxxxxy'
    },
    { confirmPassword: 'Password does not match' }
  ] */
]

const validValues: RegisterFormValues[] = [
  {
    name: 'Alice',
    companyName: 'Doe',
    email: 'alice_doe@gmail.com',
    telephone: '12345678'
    /*password: '123456',
    confirmPassword: '123456'*/
  },
  {
    name: 'xxxxxxxx',
    companyName: 'yyyyy',
    email: 'xxxyyyy@company.org',
    telephone: '12345678'
    /*password: 'a',
    confirmPassword: 'a'*/
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
