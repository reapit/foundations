import { updateAppRestrictionsService } from '../apps'
import { fetcher } from '@reapit/utils-common'

jest.mock('@reapit/utils-common')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('updateAppRestrictionsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await updateAppRestrictionsService({ status: 'include', appId: 'SOME_ID' }, 'SBOX')).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updateAppRestrictionsService({ status: 'include', appId: 'SOME_ID' }, 'SBOX')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to update app restrictions')
  })
})
