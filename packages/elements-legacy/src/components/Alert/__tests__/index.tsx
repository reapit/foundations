import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Alert } from '..'
import toJson from 'enzyme-to-json'

describe('Alert', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<Alert message="Some random message" />))).toMatchSnapshot()
  })

  it('should us to change type props', () => {
    const wrapper = render(<Alert message="Some random message" type="danger" />)
    expect(wrapper.props().type).toEqual('danger')
    wrapper.setProps({ type: 'warning' })
    expect(wrapper.props().type).toEqual('warning')
    wrapper.setProps({ type: 'success' })
    expect(wrapper.props().type).toEqual('success')
    wrapper.setProps({ type: 'info' })
    expect(wrapper.props().type).toEqual('info')
  })

  it('should allow custom className', () => {
    const wrapper = render(<Alert message="Some random message" className="addition" />)
    expect(wrapper.find('.addition')).toHaveLength(1)
  })

  it('should render close button if have closable prop', () => {
    const wrapper = render(<Alert message="Error message" closable />)
    expect(wrapper.find('.close')).toHaveLength(1)
  })

  it('simulates afterClose event', () => {
    const mockCallBack = jest.fn()
    const wrapper = render(<Alert message="Error message" afterClose={mockCallBack} closable />)
    wrapper.find('button').simulate('click')
    expect(mockCallBack).toBeCalledTimes(1)
  })

  it('simulates closeButton event when afterClose is not func', () => {
    const mockCallBack = undefined
    const wrapper = render(<Alert message="Error message" afterClose={mockCallBack} closable />)
    wrapper.find('button').simulate('click')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
