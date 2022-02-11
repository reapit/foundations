import { handleReapitError } from '../utils'

const stubError = {
  errors: [
    { field: 'clientId', message: 'The value provided is in an invalid format' },
    { field: 'approvedBy', message: 'The value provided is in an invalid format' },
  ],
  statusCode: 422,
  dateTime: '2022-02-11T14:58:22.5343978Z',
  description: 'One or more validation failures have occurred. Please refer to Errors list for details',
}

describe('handleReapitError', () => {
  it('should handle an error correctly', () => {
    expect(handleReapitError(stubError)).toEqual(
      `${stubError.description} Field: ${stubError.errors[0].field}, Message: ${stubError.errors[0].message}, Field: ${stubError.errors[1].field}, Message: ${stubError.errors[1].message}`,
    )
  })

  it('should handle an empty error', () => {
    expect(handleReapitError({})).toEqual('Something went wrong ')
  })
})
