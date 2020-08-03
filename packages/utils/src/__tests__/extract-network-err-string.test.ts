import { extractNetworkErrString } from '@/extract-network-err-string'
import { errorMessages } from '@/constants/error-messages'

describe('extractNetworkErrString', () => {
  it('should run correctly with non standard network error object', () => {
    const mockError = 'err'
    expect(
      extractNetworkErrString({
        description: mockError,
      }),
    ).toBe(errorMessages.DEFAULT_SERVER_ERROR)
  })
  it('should run correctly with standard network error object', () => {
    const mockError = 'err'
    expect(
      extractNetworkErrString({
        response: {
          description: mockError,
        },
      }),
    ).toBe(mockError)
  })
})
