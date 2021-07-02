import React from 'react'
import { shallow } from 'enzyme'
import { InputAddOn } from '../'

describe('InputAddOn component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<InputAddOn />)
    expect(wrapper).toMatchSnapshot()
  })
})
