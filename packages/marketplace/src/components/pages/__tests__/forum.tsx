import React from 'react'
import { shallow } from 'enzyme'
import Forum from '../forum'

describe('Forum', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Forum />)
    expect(wrapper).toMatchSnapshot()
  })
})
