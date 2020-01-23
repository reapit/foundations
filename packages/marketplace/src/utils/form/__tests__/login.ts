import { validate, LoginFormError } from '../login'
import { LoginFormValues } from '@/components/pages/login'

type InputOutput = [LoginFormValues, LoginFormError]

const invalidValues: InputOutput[] = [
  [
    { userName: '', password: '' },
    { userName: 'Required', password: 'Required' },
  ],
  [
    { userName: 'invalid.com', password: '' },
    { userName: 'Invalid email address', password: 'Required' },
  ],
  [{ userName: '', password: '12345678' }, { userName: 'Required' }],
  [{ userName: '@@@.org', password: 'password' }, { userName: 'Invalid email address' }],
]

const validValues: InputOutput[] = [
  [{ userName: 'my@gmail.com', password: '1234567' }, {}],
  [{ userName: 'foo@bar.com.au', password: 'aaaaaaaaaa' }, {}],
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
