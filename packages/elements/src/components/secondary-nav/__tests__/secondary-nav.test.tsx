import React from 'react'
import { render } from '@testing-library/react'
import { SecondaryNav, SecondaryNavItem } from '../'

describe('SecondaryNav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <SecondaryNav>
        <SecondaryNavItem>App List</SecondaryNavItem>
        <SecondaryNavItem active>Create App</SecondaryNavItem>
      </SecondaryNav>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
