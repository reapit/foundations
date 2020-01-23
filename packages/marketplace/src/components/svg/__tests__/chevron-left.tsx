import React from 'react'
import { shallow } from 'enzyme'
import ChevronLeft from '../chevron-left'

describe('ChevronLeft', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ChevronLeft />)
    expect(wrapper).toMatchSnapshot()
  })
})
