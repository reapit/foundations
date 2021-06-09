import React from 'react'
import { shallow } from 'enzyme'
import { Nav, NavItem, NavSubNavItem, NavSubNav } from '../'

describe('Nav component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('NavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<NavItem />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a secondary item', () => {
    const wrapper = shallow(<NavItem isSecondary />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('NavSubNav component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<NavSubNav />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('NavSubNavItem component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<NavSubNavItem />)
    expect(wrapper).toMatchSnapshot()
  })
})
