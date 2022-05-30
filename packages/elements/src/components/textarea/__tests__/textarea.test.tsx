import React from 'react'
import { render } from '../../../tests/react-testing'
import { TextArea } from '..'

describe('TextArea component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<TextArea />)
    expect(wrapper).toMatchSnapshot()
  })
})
