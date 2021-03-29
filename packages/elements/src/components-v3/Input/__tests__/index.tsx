import * as React from 'react'
import { shallow } from 'enzyme'
import { Input } from '../'

describe('Input component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Input />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when icon prop is supplied', () => {
    const wrapper = shallow(<Input icon="add" />)
    expect(wrapper).toMatchSnapshot()
  })
})
