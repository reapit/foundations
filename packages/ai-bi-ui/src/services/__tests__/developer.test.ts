import { fetcher } from '@reapit/utils-common'
import { mockDeveloperModel } from '../../tests/__stubs__/developers'
import { acceptInviteService, createDeveloperService, rejectInviteService } from '../developer'

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

  describe('acceptInviteService', () => {
    it('should return a response from the developer service', async () => {
      const params = {
        name: 'name',
        jobTitle: 'CTO',
      }
      const developerId = 'MOCK_DEVELOPER_ID'
      const memberId = 'MOCK_MEMBER_ID'
      mockedFetch.mockReturnValueOnce(true)
      expect(await acceptInviteService(params, developerId, memberId)).toEqual(true)
    })
  })

  describe('rejectInviteService', () => {
    it('should return a response from the developer service', async () => {
      const developerId = 'MOCK_DEVELOPER_ID'
      const memberId = 'MOCK_MEMBER_ID'
      mockedFetch.mockReturnValueOnce(true)
      expect(await rejectInviteService(developerId, memberId)).toEqual(true)
    })
  })
})
