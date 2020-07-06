import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperInviteMemberModalInput } from '../developer-invite-member-modal-input'

describe('DeveloperInviteMemberModalInput', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperInviteMemberModalInput />)
    expect(wrapper).toMatchSnapshot()
  })
})
