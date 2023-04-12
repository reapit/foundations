import React from 'react'
import { handleInviteMember, InviteMemberModalForm } from '../invite-member-modal-form'
import { render } from '../../../tests/react-testing'

describe('InviteMemberModalForm', () => {
  it('should match snapshot', () => {
    expect(render(<InviteMemberModalForm developerId="MOCK_ID" closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleInviteMember', () => {
  it('should handle member update', async () => {
    const inviteMember = jest.fn(() => Promise.resolve(true))
    const closeModal = jest.fn()
    const inviteMemberModel = {
      id: 'MOCK_ID',
      email: 'MOCK_EMAIL',
      name: 'MOCK_FIRST_NAME',
      jobTitle: 'MOCK_LAST_NAME',
    }

    const curried = handleInviteMember(inviteMember, closeModal)

    await curried(inviteMemberModel)

    expect(inviteMember).toHaveBeenCalledWith(inviteMemberModel)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
