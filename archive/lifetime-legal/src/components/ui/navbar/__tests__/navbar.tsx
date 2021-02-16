import React from 'react'
import { shallow } from 'enzyme'
import Navbar from '../navbar'

describe('Navbar', () => {
  it('should match as snapshot', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper).toMatchSnapshot()
  })
})
