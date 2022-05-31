import React from 'react'
import { render } from '../../../tests/react-testing'
import Times from '../times'

describe('Times', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Times />)
    expect(wrapper).toMatchSnapshot()
  })
})
