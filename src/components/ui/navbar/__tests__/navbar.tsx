import React from 'react'
import { shallow } from 'enzyme'
import Navbar from '../navbar'

describe('Navbar', () => {
  it('should run correctly', () => {
    const mockProps = {
      logout: jest.fn()
    }
    const wrapper = shallow(<Navbar {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
