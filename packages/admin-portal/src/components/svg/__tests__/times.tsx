import React from 'react'
import { shallow } from 'enzyme'
import Times from '../times'

describe('Times', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Times />)
    expect(wrapper).toMatchSnapshot()
  })
})
