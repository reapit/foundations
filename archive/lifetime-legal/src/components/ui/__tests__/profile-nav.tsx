import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ProfileNav from '../profile-nav'

describe('ProfileNav', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ProfileNav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
