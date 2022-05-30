import React from 'react'
import { render } from '@testing-library/react'
import { TextArea } from '..'

describe('TextArea component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<TextArea />)
    expect(wrapper).toMatchSnapshot()
  })
})
