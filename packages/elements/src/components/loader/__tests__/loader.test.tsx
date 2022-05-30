import React from 'react'
import { render } from '../../../tests/react-testing'
import { Loader } from '..'

describe('Loader component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Loader />)
    expect(wrapper).toMatchSnapshot()
  })
})
