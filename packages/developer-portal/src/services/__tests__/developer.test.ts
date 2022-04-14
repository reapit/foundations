import { fetcher } from '@reapit/utils-common'
import { mockDeveloperModel } from '../../tests/__stubs__/developers'
import { createDeveloperService } from '../developer'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock

describe('developer services', () => {
  describe('createDeveloperService', () => {
    it('should return a response from the developer service', async () => {
      mockedFetch.mockReturnValueOnce(true)
      expect(await createDeveloperService(mockDeveloperModel)).toEqual(true)
    })
  })
})
