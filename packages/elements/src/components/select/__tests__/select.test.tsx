import React from 'react'
import { render } from '@testing-library/react'
import { Select } from '..'

describe('Select component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Select />)
    expect(wrapper).toMatchSnapshot()
  })
})
