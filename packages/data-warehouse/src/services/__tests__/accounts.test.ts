import { fetcher, fetcherWithReturnHeader } from '@reapit/elements'
import { AccountCreateModel } from '../../types/accounts'
import {
  createAccountsService,
  disableAccountsService,
  getAccountService,
  getAccountsService,
  updateAccountService,
} from '../accounts'
import { stubAccounts } from '../__stubs__/accounts'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock
const mockedFetchWithHeaders = fetcherWithReturnHeader as jest.Mock

describe('getAccountsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(stubAccounts)
    expect(await getAccountsService()).toEqual(stubAccounts)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getAccountsService()
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch account')
  })
})

describe('getAccountService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(stubAccounts._embedded[0])
    expect(await getAccountService('SOME_ID')).toEqual(stubAccounts._embedded[0])
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getAccountService('SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch account')
  })
})

describe('disableAccountsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(true)
    expect(await disableAccountsService('SOME_ID')).toEqual(true)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await disableAccountsService('SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to delete account')
  })
})

describe('createAccountsService', () => {
  it('should return a response from the accounts service', async () => {
    const headers = new Headers({ location: 'someUrl' })
    mockedFetchWithHeaders.mockReturnValueOnce(headers)
    expect(await createAccountsService({} as AccountCreateModel)).toEqual(headers.get('location'))
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetchWithHeaders.mockReturnValueOnce(undefined as any)
    await createAccountsService({} as AccountCreateModel)
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to create account')
  })
})

describe('updateAccountService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(true)
    expect(await updateAccountService({} as AccountCreateModel, 'SOME_ID')).toEqual(true)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updateAccountService({} as AccountCreateModel, 'SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to update account')
  })
})
