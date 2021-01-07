import { getAppRestrictionsService, getAppsService, updateAppRestrictionsService } from '../apps'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getAppsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await getAppsService('?pageNumber=1')).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getAppsService('?pageNumber=1')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch apps')
  })
})

describe('getAppRestrictionsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await getAppRestrictionsService()).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getAppRestrictionsService()
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to fetch app restrictions')
  })
})

describe('updateAppRestrictionsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await updateAppRestrictionsService({ status: 'include', appId: 'SOME_ID' })).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updateAppRestrictionsService({ status: 'include', appId: 'SOME_ID' })
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to update app restrictions')
  })
})
