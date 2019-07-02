import { validate, SubmitAppFormError } from '../submit-app'
import { SubmitAppFormValues } from '@/components/pages/developer-submit-app'

type InputOutput = [SubmitAppFormValues, SubmitAppFormError]

const invalidValues: InputOutput[] = [
  [{ appName: '', companyName: '' }, { appName: 'Required', companyName: 'Required' }],
  [{ appName: '', companyName: '12345678' }, { appName: 'Required' }],
  [{ appName: 'Test app', companyName: '' }, { companyName: 'Required' }]
]

const validValues: InputOutput[] = [[{ appName: 'Test app', companyName: '1234567' }, {}]]

describe('submitAppValidation', () => {
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
