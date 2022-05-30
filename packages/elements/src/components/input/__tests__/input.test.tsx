import React from 'react'
import { render } from '../../../tests/react-testing'
import { Input } from '..'

describe('Input component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Input />)
    expect(wrapper).toMatchSnapshot()
  })
})
