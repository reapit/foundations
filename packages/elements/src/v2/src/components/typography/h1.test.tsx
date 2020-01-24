import React from 'react'
import { shallow } from 'enzyme'
import { H1 } from './h1'

describe('H1', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<H1 />)
    expect(wrapper).toMatchSnapshot()
  })
})
