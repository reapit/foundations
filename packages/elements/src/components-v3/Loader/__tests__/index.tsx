import * as React from 'react'
import { mount } from 'enzyme'
import { Loader } from '../'

describe('Loader component', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(<Loader />)
    expect(wrapper).toMatchSnapshot()
  })
})
