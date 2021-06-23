import * as React from 'react'
import { shallow } from 'enzyme'
import { AfterInputText } from '../'

describe('AfterInputText component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<AfterInputText />)
    expect(wrapper).toMatchSnapshot()
  })
})
