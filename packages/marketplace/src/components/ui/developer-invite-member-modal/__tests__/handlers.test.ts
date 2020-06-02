import { FIELD_NAMES, ERRORS_MESSAGES } from '../constants'
import { validate } from '../handlers'

const values = {
  [FIELD_NAMES.NAME]: 'name',
  [FIELD_NAMES.EMAIL]: 'name@mail.com',
  [FIELD_NAMES.MESSAGE]: '',
}

describe('validate', () => {
  it('should return empty object when there is no errors', () => {
    const result = validate(values)
    expect(result).toEqual({})
  })

  it('should return correctly for name error case', () => {
    const valuesNameError = { ...values, [FIELD_NAMES.NAME]: '' }
    const result = validate(valuesNameError)
    expect(result).toEqual({ [FIELD_NAMES.NAME]: ERRORS_MESSAGES.NAME })
  })

  it('should return correctly for email error case', () => {
    const valuesEmailError = { ...values, [FIELD_NAMES.EMAIL]: 'mail' }
    const result = validate(valuesEmailError)
    expect(result).toEqual({ [FIELD_NAMES.EMAIL]: ERRORS_MESSAGES.EMAIL })
  })

  it('should return correctly for message error case', () => {
    const valuesMessageError = {
      ...values,
      [FIELD_NAMES.MESSAGE]:
        // eslint-disable-next-line max-len
        'vjhJHbGEfIZu8I7e1asgnMifylRKbJSGDXTeunG5LKv63b9vcR7CMur66ycuynoH7jfAUgI4Q9PNGmdqgqMbp3Ysvi87yEneCTxD0drvtXqgYC3DfRj6UkDh5sSsRRJIK6wOwKVb2scMbasP6eqWT3N',
    }
    const result = validate(valuesMessageError)
    expect(result).toEqual({ [FIELD_NAMES.MESSAGE]: ERRORS_MESSAGES.MESSAGE })
  })
})
