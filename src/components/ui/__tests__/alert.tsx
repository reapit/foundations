import * as React from 'react'
import { shallow, mount } from 'enzyme'
import Alert from '../alert'
import toJson from 'enzyme-to-json'

describe('Alert', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Alert message="Some random message" />))).toMatchSnapshot()
  })

  it('should us to change type props', () => {
    const wrapper = mount(<Alert message="Some random message" type="danger" />)
    expect(wrapper.props().type).toEqual('danger')
    wrapper.setProps({ type: 'warning' })
    expect(wrapper.props().type).toEqual('warning')
  })

  it('should allow custom className', () => {
    const wrapper = shallow(<Alert message="Some random message" className="addition" />)
    expect(wrapper.find('.addition')).toHaveLength(1)
  })

  it('should render close button if have closable prop', () => {
    const wrapper = shallow(<Alert message="Error message" closable />)
    expect(wrapper.find('.close')).toHaveLength(1)
  })

  it('simulates afterClose event', () => {
    const mockCallBack = jest.fn()
    const wrapper = shallow(<Alert message="Error message" afterClose={mockCallBack} closable />)
    wrapper.find('button').simulate('click')
    expect(mockCallBack).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
