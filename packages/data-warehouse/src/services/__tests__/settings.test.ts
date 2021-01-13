import { fetcher } from '@reapit/elements'
import { SettingsModel } from '../../types/settings'
import { getSettingsService, updateSettingsService } from '../settings'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getSettingsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await getSettingsService()).toEqual({})
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getSettingsService()
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to fetch settings')
  })
})

describe('updateSettingsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(true)
    expect(await updateSettingsService({ monthlyUsageCap: 1 } as Partial<SettingsModel>)).toEqual(true)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updateSettingsService({ monthlyUsageCap: 1 } as Partial<SettingsModel>)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to update settings')
  })
})
