import { fetcher } from '@reapit/elements'
import { getDataSetsService } from '../data-sets'
import { stubDataSets } from '../__stubs__/data-sets'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getDataSetsService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(stubDataSets)
    expect(await getDataSetsService()).toEqual(stubDataSets)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getDataSetsService()
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to fetch datasets')
  })
})
