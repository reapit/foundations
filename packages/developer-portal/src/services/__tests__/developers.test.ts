import { fetcher } from '@reapit/utils-common'
import {
  createDeveloper,
  updateDeveloperById,
  fetchDeveloperById,
  fetchDevelopersList,
  acceptInviteMember,
  disableMemberApi,
  fetchMemberDetails,
  fetchOrganisationMembers,
  inviteDeveloperAsOrgMemberApi,
  rejectInviteMember,
  updateOrganisationMemberById,
} from '../developers'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react')

const mockedFetch = fetcher as jest.Mock

describe('developers services', () => {
  describe('fetchDevelopersList', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchDevelopersList({})).toEqual(stub)
    })
  })

  describe('createDeveloper', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createDeveloper({})).toEqual(stub)
    })
  })

  describe('fetchDeveloperById', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchDeveloperById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('updateDeveloperById', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await updateDeveloperById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchOrganisationMembers', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchOrganisationMembers({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('inviteDeveloperAsOrgMemberApi', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(
        await inviteDeveloperAsOrgMemberApi({
          id: 'SOME_ID',
          email: 'example@mail.com',
          name: 'SOME_NAME',
          sender: 'SOME_SENDER',
          message: 'Hiya',
          jobTitle: 'SOME_JOB_TITLE',
        }),
      ).toEqual(stub)
    })
  })

  describe('fetchMemberDetails', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchMemberDetails({ developerId: 'SOME_ID', memberId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('acceptInviteMember', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await acceptInviteMember({ developerId: 'SOME_ID', memberId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('rejectInviteMember', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await rejectInviteMember({ developerId: 'SOME_ID', memberId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('updateOrganisationMemberById', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await updateOrganisationMemberById({ memberId: 'SOME_ID', id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('disableMemberApi', () => {
    it('should return a response from the developers service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await disableMemberApi({ memberId: 'SOME_ID', developerId: 'SOME_ID' })).toEqual(stub)
    })
  })
})
