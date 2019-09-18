import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ProfileToggle, { ProfileToggleProps } from '../profile-toggle'

const props: ProfileToggleProps = {
  complete: false,
  isOpen: false,
  title: 'Title'
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

  it('Should toggle the pane when use mouse click', () => {
    const wrapper = shallow(
      <ProfileToggle {...props} isOpen={false}>
        <div id="inner-component">Children</div>
      </ProfileToggle>
    )

    const pane = wrapper.find('[role="button"]')
    expect(wrapper.find('#inner-component')).toHaveLength(0)
    pane.simulate('click')
    expect(wrapper.find('#inner-component')).toHaveLength(1)
    pane.simulate('click')
    expect(wrapper.find('#inner-component')).toHaveLength(0)
  })

  it('Should toggle the pane when use keyboard Enter', () => {
    const wrapper = shallow(
      <ProfileToggle {...props} isOpen={false}>
        <div id="inner-component">Children</div>
      </ProfileToggle>
    )

    const pane = wrapper.find('[role="button"]')
    expect(wrapper.find('#inner-component')).toHaveLength(0)
    pane.simulate('keyDown', { key: 'Enter' })
    expect(wrapper.find('#inner-component')).toHaveLength(1)
    pane.simulate('keyDown', { key: 'Enter' })
    expect(wrapper.find('#inner-component')).toHaveLength(0)
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
