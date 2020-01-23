import { registerValidate, RegisterFormError } from '../register'
import { RegisterFormValues } from '@/components/pages/register'

type InputOutput = [RegisterFormValues, RegisterFormError]

const invalidValues: InputOutput[] = [
  [
    { name: '', companyName: '', email: '', telephone: '', password: '', confirmPassword: '', agreedTerms: '' },
    {
      name: 'Required',
      companyName: 'Required',
      email: 'Required',
      telephone: 'Required',
      password:
        'Your Password should be a minimum of 8 characters; must contain at least ' +
        'one lowercase letter, one uppercase letter and one number',
      agreedTerms: 'Required'
    }
  ],
  [
    {
      name: 'John Doe',
      companyName: 'Acme',
      email: '',
      telephone: '',
      password: '',
      confirmPassword: 'xxxxxx',
      agreedTerms: ''
    },
    {
      email: 'Required',
      telephone: 'Required',
      password:
        'Your Password should be a minimum of 8 characters; must contain at least ' +
        'one lowercase letter, one uppercase letter and one number',
      agreedTerms: 'Required'
    }
  ],
  [
    {
      name: '',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678',
      password: 'xxxxxx',
      confirmPassword: 'xxxxxx',
      agreedTerms: ''
    },
    {
      name: 'Required',
      email: 'Invalid email address',
      password:
        'Your Password should be a minimum of 8 characters; must contain at least ' +
        'one lowercase letter, one uppercase letter and one number',
      agreedTerms: 'Required'
    }
  ],
  [
    {
      name: '',
      companyName: 'Doe John',
      email: 'invalid.com@.com',
      telephone: '12345678',
      password: 'password',
      confirmPassword: 'password',
      agreedTerms: '123'
    },
    {
      name: 'Required',
      email: 'Invalid email address',
      password:
        'Your Password should be a minimum of 8 characters; must contain at least ' +
        'one lowercase letter, one uppercase letter and one number'
    }
  ],
  [
    {
      name: 'Jame',
      companyName: 'Doe',
      email: 'valid@company.com',
      telephone: '12345678',
      password: 'Password1',
      confirmPassword: 'Password2',
      agreedTerms: '123'
    },
    { confirmPassword: 'Password does not match' }
  ]
]

const validValues: RegisterFormValues[] = [
  {
    name: 'Alice',
    companyName: 'Doe',
    email: 'alice_doe@gmail.com',
    telephone: '12345678',
    password: 'Password1',
    confirmPassword: 'Password1',
    agreedTerms: '123'
  },
  {
    name: 'xxxxxxxx',
    companyName: 'yyyyy',
    email: 'xxxyyyy@company.org',
    telephone: '12345678',
    password: 'Password123',
    confirmPassword: 'Password123',
    agreedTerms: '123'
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
