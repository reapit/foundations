import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { Message } from '../message'

describe('Message', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Message message="Hello world" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with different variants', () => {
    const wrapper = mount(<Message message="Some random message" variant="primary" />)
    expect(wrapper.props().variant).toEqual('primary')
    wrapper.setProps({ variant: 'info' })
    expect(wrapper.props().variant).toEqual('info')
    wrapper.setProps({ variant: 'success' })
    expect(wrapper.props().variant).toEqual('success')
    wrapper.setProps({ variant: 'danger' })
    expect(wrapper.props().variant).toEqual('danger')
  })

  it('should allow custom className', () => {
    const wrapper = mount(<Message message="Some random message" className="addition" />)
    expect(wrapper.find('.addition')).toHaveLength(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
