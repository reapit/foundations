import React from 'react'
import { render } from '../../../tests/react-testing'
import { Nav, NavItem, NavSubNavItem, NavSubNav } from '../nav'

describe('Nav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('NavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<NavItem />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a secondary item', () => {
    const wrapper = render(<NavItem isSecondary />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('NavSubNav component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<NavSubNav />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('NavSubNavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<NavSubNavItem />)
    expect(wrapper).toMatchSnapshot()
  })
})
