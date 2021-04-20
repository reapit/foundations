import * as React from 'react'
import { mount } from 'enzyme'
import { SecondaryNav, SecondaryNavItem } from '../'

describe('SecondaryNav component', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(
      <SecondaryNav>
        <SecondaryNavItem>App List</SecondaryNavItem>
        <SecondaryNavItem active>Create App</SecondaryNavItem>
      </SecondaryNav>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
