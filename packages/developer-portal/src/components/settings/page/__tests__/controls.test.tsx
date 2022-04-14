import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockMemberModel } from '../../../../tests/__stubs__/members'
import { Controls, handleInviteMember, handleInviteMemberSuccess, handleLogout } from '../controls'

jest.mock('../../../../core/use-global-state')

describe('Controls', () => {
  it('should match a snapshot', () => {
    expect(render(<Controls />)).toMatchSnapshot()
  })
})

describe('handleLogout', () => {
  it('should handle member update', () => {
    const connectLogoutRedirect = jest.fn()

    const curried = handleLogout(connectLogoutRedirect)

    curried()

    expect(connectLogoutRedirect).toHaveBeenCalledTimes(1)
  })
})

describe('handleInviteMember', () => {
  it('should handle member update', () => {
    const inviteMember = jest.fn()
    const closeModal = jest.fn()
    const member = mockMemberModel

    const curried = handleInviteMember(inviteMember, closeModal)

    curried(member)

    expect(inviteMember).toHaveBeenCalledWith(member)
  })
})

describe('handleInviteMemberSuccess', () => {
  it('should handle member update', () => {
    const membersShouldRefresh = jest.fn()
    const inviteMemberSuccess = true
    const curried = handleInviteMemberSuccess(membersShouldRefresh, inviteMemberSuccess)

    curried()

    expect(membersShouldRefresh).toHaveBeenCalledWith(true)
  })
})
