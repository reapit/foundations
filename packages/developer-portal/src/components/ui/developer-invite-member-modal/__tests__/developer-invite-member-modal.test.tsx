import * as React from 'react'
import { shallow } from 'enzyme'
import { InviteMemberModal, InviteMemberModalInput } from '../developer-invite-member-modal'

describe('developer-invite-member-modal', () => {
  describe('InviteMemberModal', () => {
    it('should match snapshot with default', () => {
      const wrapper = shallow(<InviteMemberModal afterClose={jest.fn()} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot with visible true', () => {
      const wrapper = shallow(<InviteMemberModal visible={true} afterClose={jest.fn()} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('InviteMemberModalInput', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<InviteMemberModalInput />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
