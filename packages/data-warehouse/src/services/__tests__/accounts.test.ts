import { fetcher } from '@reapit/utils-common'
import { getAccountService } from '../accounts'
import { stubAccounts } from '../../tests/__stubs__/accounts'

jest.mock('@reapit/utils-common')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getAccountService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(stubAccounts._embedded[0])
    expect(await getAccountService('SOME_ID')).toEqual(stubAccounts._embedded[0])
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getAccountService('SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to fetch account')
  })
})
