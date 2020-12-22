import { fetcher } from '@reapit/elements'
import { getBillingByDatesService, getBillingByMonthService, getStatsByDatesService } from '../billing'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getBillingByMonthService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await getBillingByMonthService('SOME_MONTH')).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getBillingByMonthService('SOME_MONTH')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch billing')
  })
})

describe('getBillingByDatesService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await getBillingByDatesService('SOME_MONTH', 'SOME_MONTH')).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getBillingByDatesService('SOME_MONTH', 'SOME_MONTH')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch billing')
  })
})

describe('getStatsByDatesService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await getStatsByDatesService('SOME_MONTH', 'SOME_MONTH')).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getStatsByDatesService('SOME_MONTH', 'SOME_MONTH')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch traffic stats')
  })
})
