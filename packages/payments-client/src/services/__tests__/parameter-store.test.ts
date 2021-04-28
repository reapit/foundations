import { fetchConfigWithKey } from '../parameter-store'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')
const mockedFetch = fetcher as jest.Mock

const VALID_SSM_KEY = 'PaymentConfig'
const INVALID_SSM_KEY = 'INVALID_SSM_KEY'
const mockResponse = { response: { configTest: true } }

describe('fetchPaymentConfigFromStore', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await fetchConfigWithKey(VALID_SSM_KEY)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await fetchConfigWithKey(INVALID_SSM_KEY)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to get from parameter store')
  })
})
