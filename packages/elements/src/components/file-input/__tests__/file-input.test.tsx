import React from 'react'
import { render } from '@testing-library/react'
import { FileInput } from '..'

describe('FileInput component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<FileInput />)
    expect(wrapper).toMatchSnapshot()
  })
})
