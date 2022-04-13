import React from 'react'
import {
  handleDeleteMember,
  handleRefreshMembers,
  handleReinviteMember,
  handleUpdateMember,
  MemberUpdateControls,
} from '../member-update-controls'
import { render } from '../../../../tests/react-testing'
import { mockMemberModel } from '../../../../tests/__stubs__/members'
import { ReapitConnectSession } from '@reapit/connect-session'

describe('MemberUpdateControls', () => {
  it('should match snapshot', () => {
    expect(render(<MemberUpdateControls member={mockMemberModel} refreshMembers={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleRefreshMembers', () => {
  it('should refresh members if one param is true', () => {
    const refreshMembers = jest.fn()
    const updateMemberSuccess = true
    const deleteMemberSuccess = false
    const reinviteMemberSuccess = false

    const curried = handleRefreshMembers(
      refreshMembers,
      updateMemberSuccess,
      deleteMemberSuccess,
      reinviteMemberSuccess,
    )

    curried()

    expect(refreshMembers).toHaveBeenCalledTimes(1)
  })

  it('should refresh members if none of the params are true', () => {
    const refreshMembers = jest.fn()
    const updateMemberSuccess = false
    const deleteMemberSuccess = false
    const reinviteMemberSuccess = false

    const curried = handleRefreshMembers(
      refreshMembers,
      updateMemberSuccess,
      deleteMemberSuccess,
      reinviteMemberSuccess,
    )

    curried()

    expect(refreshMembers).not.toHaveBeenCalled()
  })
})

describe('handleUpdateMember', () => {
  it('should handle member update', () => {
    const updateMember = jest.fn()
    const memberUpdate = mockMemberModel

    const curried = handleUpdateMember(updateMember, memberUpdate)

    curried()

    expect(updateMember).toHaveBeenCalledWith(memberUpdate)
  })
})

describe('handleDeleteMember', () => {
  it('should handle member update', () => {
    const deleteMember = jest.fn()

    const curried = handleDeleteMember(deleteMember)

    curried()

    expect(deleteMember).toHaveBeenCalledWith(undefined)
  })
})

describe('handleReinviteMember', () => {
  it('should handle member update', () => {
    const reinviteMember = jest.fn()
    const member = mockMemberModel
    const connectSession = {
      loginIdentity: {
        email: 'MOCK_EMAIL',
        orgName: 'MOCK_ORG_NAME',
      },
    }

    const curried = handleReinviteMember(reinviteMember, member, connectSession as ReapitConnectSession)

    curried()

    expect(reinviteMember).toHaveBeenCalledWith({
      name: member.name,
      jobTitle: member.jobTitle,
      email: member.email,
      sender: connectSession.loginIdentity.email,
      message: `Resending your invite to the ${connectSession.loginIdentity.orgName} in the Reapit Developer Portal`,
    })
  })
})
