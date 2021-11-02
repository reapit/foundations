import { fetcher } from '@reapit/utils-common'
import { bulkInstall, installOrg, uninstallOrg } from '../installation'

jest.mock('@reapit/utils-common')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('bulkInstall', () => {
  it('should return a response from the installations service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await bulkInstall(['id1'], ['id2'], 'SOME_ID')).toBe(true)
  })

  it('should catch an error if no response from installations service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await bulkInstall(['id1'], ['id2'], 'SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to create bulk installations')
  })
})

describe('installOrg', () => {
  it('should return a response from the installations service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await installOrg({})).toBe(true)
  })

  it('should catch an error if no response from installations service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await installOrg({})
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to create installation')
  })
})

describe('uninstallOrg', () => {
  it('should return a response from the installations service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await uninstallOrg({}, 'SOME_ID')).toBe(true)
  })

  it('should catch an error if no response from installations service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await uninstallOrg({}, 'SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to terminate installation')
  })
})
