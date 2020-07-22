import ActionTypes from '@/constants/action-types'
import {
  inviteDeveloperAsOrgMember,
  inviteDeveloperAsOrgMemberFailed,
  inviteDeveloperAsOrgMemberSuccess,
} from '../developers'

describe('developers', () => {
  describe('inviteDeveloperAsOrgMember', () => {
    it('should create a inviteDeveloperAsOrgMember action', () => {
      expect(inviteDeveloperAsOrgMember.type).toEqual(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER)
    })
  })
  describe('inviteDeveloperAsOrgMemberFailed', () => {
    it('should create a inviteDeveloperAsOrgMemberFailed action', () => {
      expect(inviteDeveloperAsOrgMemberFailed.type).toEqual(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_FAILED)
    })
  })
  describe('inviteDeveloperAsOrgMemberSuccess', () => {
    it('should ', () => {
      expect(inviteDeveloperAsOrgMemberSuccess.type).toEqual(ActionTypes.INVITE_DEVELOPER_AS_ORG_MEMBER_SUCCESS)
    })
  })
})
