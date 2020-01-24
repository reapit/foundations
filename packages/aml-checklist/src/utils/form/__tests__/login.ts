import { validate, LoginFormError } from '../login'
import { LoginFormValues } from '@/components/pages/login'

type InputOutput = [LoginFormValues, LoginFormError]

const invalidValues: InputOutput[] = [
  [
    { email: '', password: '' },
    { email: 'Required', password: 'Required' }
  ],
  [
    { email: 'invalid.com', password: '' },
    { email: 'Invalid email address', password: 'Required' }
  ],
  [{ email: '', password: '12345678' }, { email: 'Required' }],
  [{ email: '@@@.org', password: 'password' }, { email: 'Invalid email address' }]
]

const validValues: InputOutput[] = [
  [{ email: 'my@gmail.com', password: '1234567' }, {}],
  [{ email: 'foo@bar.com.au', password: 'aaaaaaaaaa' }, {}]
]

describe('loginValidation', () => {
  it('invalid values', () => {
    invalidValues.forEach(([input, output]) => {
      expect(validate(input)).toEqual(output)
    })
  })

  it('valid values', () => {
    validValues.forEach(([input, output]) => {
      expect(validate(input)).toEqual(output)
    })
  })
})
