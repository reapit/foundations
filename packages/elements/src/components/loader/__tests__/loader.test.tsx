import React from 'react'
import { render } from '@testing-library/react'
import { Loader } from '..'

describe('Loader component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Loader />)
    expect(wrapper).toMatchSnapshot()
  })
})
