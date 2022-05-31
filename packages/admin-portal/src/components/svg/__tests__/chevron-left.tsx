import React from 'react'
import { render } from '../../../tests/react-testing'
import ChevronLeft from '../chevron-left'

describe('ChevronLeft', () => {
  it('should match snapshot', () => {
    const wrapper = render(<ChevronLeft />)
    expect(wrapper).toMatchSnapshot()
  })
})
