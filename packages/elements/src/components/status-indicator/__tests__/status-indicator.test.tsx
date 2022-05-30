import React from 'react'
import { render } from '../../../tests/react-testing'
import { StatusIndicator } from '..'

describe('Table component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="primary" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="secondary" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="danger" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="success" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator intent="critical" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const wrapper = render(<StatusIndicator />)
    expect(wrapper).toMatchSnapshot()
  })
})
