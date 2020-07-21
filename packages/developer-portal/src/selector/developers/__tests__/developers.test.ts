import appState from '@/reducers/__stubs__/app-state'
import {
  selectInviteDeveloperAsOrgMemberLoading,
  selectOrganisationMembers,
  selectOrganisationMembersLoading,
} from '../developers'

describe('developers', () => {
  describe('selectOrganisationMembers', () => {
    it('should return correct data', () => {
      const data = selectOrganisationMembers(appState)
      expect(data).toEqual([])
    })
  })
  describe('selectOrganisationMembersLoading', () => {
    it('should return correct data', () => {
      const data = selectOrganisationMembersLoading(appState)
      expect(data).toEqual(false)
    })
  })
  describe('selectInviteDeveloperAsOrgMemberLoading', () => {
    it('should run correctly', () => {
      const data = selectInviteDeveloperAsOrgMemberLoading(appState)
      expect(data).toEqual(false)
    })
  })
})
