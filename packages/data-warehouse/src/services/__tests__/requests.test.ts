import { fetcher } from '@reapit/elements'
import { createRequestService } from '../requests'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('createRequestService', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(true)
    expect(await createRequestService('SOME_ID')).toEqual(true)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await createRequestService('SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to create request')
  })
})
