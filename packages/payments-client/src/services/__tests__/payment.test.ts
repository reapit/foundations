import { updatePaymentStatus, updatePaymentSessionStatus } from '../payment'
import { fetcher } from '@reapit/elements'
import { body, params } from '../__stubs__/payment'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

describe('updatePaymentStatus', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await updatePaymentStatus(body, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updatePaymentStatus(body, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to update user')
  })
})

describe('updatePaymentSessionStatus  ', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await updatePaymentSessionStatus(body, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updatePaymentSessionStatus(body, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to update user')
  })
})
