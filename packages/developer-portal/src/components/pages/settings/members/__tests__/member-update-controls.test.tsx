import React from 'react'
import { MemberUpdateControls } from '../member-update-controls'
import { render } from '../../../../../tests/react-testing'
import { mockMemberModel } from '../../../../../tests/__stubs__/members'

describe('MemberUpdateControls', () => {
  it('should match snapshot', () => {
    expect(render(<MemberUpdateControls member={mockMemberModel} refreshMembers={jest.fn()} />)).toMatchSnapshot()
  })
})
