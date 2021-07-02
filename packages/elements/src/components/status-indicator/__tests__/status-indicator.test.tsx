import React from 'react'
import { shallow } from 'enzyme'
import { StatusIndicator } from '..'

describe('Table component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator intent="primary" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator intent="secondary" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator intent="danger" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator intent="success" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator intent="critical" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = shallow(<StatusIndicator />)
    expect(wrapper).toMatchSnapshot()
  })
})
