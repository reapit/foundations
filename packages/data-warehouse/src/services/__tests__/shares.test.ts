import { fetcher } from '@reapit/elements'
import { deleteSharesService, getSharesService } from '../shares'
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
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to fetch shares')
  })
})

describe('deleteSharesService', () => {
  it('should return a response from the delete accounts service', async () => {
    mockedFetch.mockReturnValueOnce(true)
    expect(await deleteSharesService('SOME_ID')).toEqual(true)
  })

  it('should catch an error if no response from delete accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await deleteSharesService('SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to delete share')
  })
})
