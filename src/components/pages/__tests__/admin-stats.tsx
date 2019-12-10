import React from 'react'
import { shallow } from 'enzyme'
import AdminStats from '../admin-stats'

describe('Admin Stats', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<AdminStats />)
    expect(wrapper).toMatchSnapshot()
  })
})
