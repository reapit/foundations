import React from 'react'
import { render } from '../../../tests/react-testing'
import { InputAddOn } from '../'

describe('InputAddOn component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputAddOn />)
    expect(wrapper).toMatchSnapshot()
  })
})
