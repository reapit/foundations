import React from 'react'
import { render } from '@testing-library/react'
import { InputAddOn } from '../'

describe('InputAddOn component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputAddOn />)
    expect(wrapper).toMatchSnapshot()
  })
})
