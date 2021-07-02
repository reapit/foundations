import React from 'react'
import { shallow } from 'enzyme'
import { TextArea } from '..'

describe('TextArea component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<TextArea />)
    expect(wrapper).toMatchSnapshot()
  })
})
