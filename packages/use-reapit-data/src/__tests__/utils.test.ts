import { AxiosError } from 'axios'
import { handleReapitError, listToBatchQuery, objectToQuery, stringListToBatchQuery } from '../utils'

const stubError = {
  message: 'Something went wrong',
  response: {
    data: {
      errors: [
        { field: 'clientId', message: 'The value provided is in an invalid format' },
        { field: 'approvedBy', message: 'The value provided is in an invalid format' },
      ],
      statusCode: 422,
      dateTime: '2022-02-11T14:58:22.5343978Z',
      description: 'One or more validation failures have occurred. Please refer to Errors list for details',
    },
  },
} as AxiosError<any>

describe('handleReapitError', () => {
  it('should handle an error correctly', () => {
    expect(handleReapitError(stubError)).toEqual(
      `${stubError.response?.data.description} "${stubError.response?.data.errors[0].field}: ${stubError.response?.data.errors[0].message}", "${stubError.response?.data.errors[1].field}: ${stubError.response?.data.errors[1].message}"`,
    )
  })

  it('should handle an empty error with a default message', () => {
    expect(handleReapitError({} as AxiosError<any>, 'Default message')).toEqual('Default message ')
  })

  it('should handle an empty error', () => {
    expect(handleReapitError({} as AxiosError<any>)).toEqual(
      'An unknown error has occurred, please refresh the page and try again. ',
    )
  })
})

describe('listToBatchQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const list = [{ id: 'MOCK_ID1' }, { id: 'MOCK_ID2' }, { id: 'MOCK_ID3' }]
    const result = listToBatchQuery(list, 'id', 'appId')

    expect(result).toEqual('MOCK_ID1&appId=MOCK_ID2&appId=MOCK_ID3')
  })
})

describe('stringListToBatchQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const list = ['MOCK_ID1', 'MOCK_ID2', 3]
    const result = stringListToBatchQuery(list, 'appId')

    expect(result).toEqual('MOCK_ID1&appId=MOCK_ID2&appId=3')
  })
})

describe('objectToQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const object = {
      appId: ['MOCK_ID1', 'MOCK_ID2'],
      someOtherKey: 'FOO',
      aNumericKey: 2,
    }
    const result = objectToQuery(object)

    expect(result).toEqual({ appId: 'MOCK_ID1&appId=MOCK_ID2', someOtherKey: 'FOO', aNumericKey: '2' })
  })
})
