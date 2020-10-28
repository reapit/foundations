import { fetcher } from '@reapit/elements'
import { getSharesService } from '../shares'
import { stubShares } from '../__stubs__/shares'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getSharesService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(stubShares)
    expect(await getSharesService()).toEqual(stubShares)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getSharesService()
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch shares')
  })
})
