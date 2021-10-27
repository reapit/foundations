import { fetcher } from '@reapit/utils-common'
import { bulkInstall } from '../installation'

jest.mock('@reapit/utils-common')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('bulkInstall', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce({})
    expect(await bulkInstall(['id1'], ['id2'], 'SOME_ID')).toBe(true)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await bulkInstall(['id1'], ['id2'], 'SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to create bulk installations')
  })
})
