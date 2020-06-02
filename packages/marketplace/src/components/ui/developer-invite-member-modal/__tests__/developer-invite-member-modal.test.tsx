import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperInviteMemberModal } from '../developer-invite-member-modal'

describe('DeveloperInviteMemberModal', () => {
  it('should match snapshot with default', () => {
    const wrapper = shallow(<DeveloperInviteMemberModal afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with visible true', () => {
    const wrapper = shallow(<DeveloperInviteMemberModal visible={true} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
