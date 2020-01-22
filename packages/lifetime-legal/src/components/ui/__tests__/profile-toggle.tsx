import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ProfileToggle, { ProfileToggleProps } from '../profile-toggle'

const props: ProfileToggleProps = {
  complete: false,
  isOpen: false,
  title: 'Title',
  onToggle: jest.fn()
}

describe('ProfileToggle', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ProfileToggle {...props} isOpen>
        <div>Children</div>
      </ProfileToggle>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('Should render the status complete/incomplete correctly', () => {
    const wrapper = shallow(
      <ProfileToggle {...props} complete>
        <div id="inner-component">Children</div>
      </ProfileToggle>
    )

    expect(
      wrapper
        .find('[data-test="profile-toggle-status"]')
        .childAt(1)
        .text()
    ).toBe('Complete')
    wrapper.setProps({ complete: false })
    expect(
      wrapper
        .find('[data-test="profile-toggle-status"]')
        .childAt(1)
        .text()
    ).toBe('Incomplete')
  })
})
