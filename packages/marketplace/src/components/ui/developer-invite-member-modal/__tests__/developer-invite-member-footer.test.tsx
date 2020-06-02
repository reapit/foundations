import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperInviteMemberModalFooter } from '../developer-invite-member-footer'

describe('DeveloperInviteMemberModalFooter', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperInviteMemberModalFooter afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
